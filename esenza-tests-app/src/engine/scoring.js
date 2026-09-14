// Motor de puntuación genérico. Cada test define:
// - scoringMode: 'keyed' (Sí/No con respuesta ideal) o 'frequency' (0-3 Nunca..Siempre)
// - domains: [{ code, name, color, blurb, items: [{ text, keyed }] }]
//   'keyed' solo se usa en modo 'keyed' (valor "si" | "no"); en modo 'frequency' es null.
// - secondary: sección opcional de preferencias/recursos (no puntúa riesgo),
//   con sus propias opciones y niveles 1-4.

export function computeDomainScores(test, answers) {
  return test.domains.map((domain) => {
    let sum = 0;
    let max = 0;
    domain.items.forEach((item, qi) => {
      const key = `${domain.code}-${qi}`;
      const val = answers[key];
      if (test.scoringMode === 'keyed') {
        max += 1;
        if (val === item.keyed) sum += 1;
      } else {
        max += 3;
        sum += val || 0;
      }
    });
    const pct = max > 0 ? Math.round((sum / max) * 100) : 0;
    return { code: domain.code, name: domain.name, color: domain.color, pct };
  });
}

export function computeOverallPct(domainScores) {
  if (domainScores.length === 0) return 0;
  return Math.round(domainScores.reduce((a, s) => a + s.pct, 0) / domainScores.length);
}

export function computeSecondaryTop(test, secondaryAnswers, minVal = 3) {
  if (!test.secondary) return [];
  return test.secondary.options
    .map((o) => ({ ...o, val: secondaryAnswers[o.code] || 0 }))
    .filter((o) => o.val >= minVal)
    .sort((a, b) => b.val - a.val);
}

export function totalItemCount(test) {
  const domainItems = test.domains.reduce((a, d) => a + d.items.length, 0);
  const secondaryItems = test.secondary ? test.secondary.options.length : 0;
  return domainItems + secondaryItems;
}
