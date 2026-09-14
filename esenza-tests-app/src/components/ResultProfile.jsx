import { TESTS } from '../data/testRegistry.js';

export default function ResultProfile({ assessment, onBack }) {
  const test = TESTS[assessment.testId];
  if (!test) return <p>Test no encontrado.</p>;

  const domainScores = assessment.domainScores || [];
  const overallPct = assessment.overallPct ?? 0;
  const band = test.bandFor(overallPct);
  const meta = assessment.meta || {};
  const secondaryAnswers = assessment.secondaryAnswers || {};

  const topSecondary = test.secondary
    ? test.secondary.options
        .map((o) => ({ ...o, val: secondaryAnswers[o.code] || 0 }))
        .filter((o) => o.val >= 3)
        .sort((a, b) => b.val - a.val)
    : [];

  const originCandidates = (test.originDomains || [])
    .map((code) => domainScores.find((s) => s.code === code))
    .filter((s) => s && s.pct >= 40)
    .sort((a, b) => b.pct - a.pct);

  const strengths = [...domainScores].filter((s) => s.pct < 45).sort((a, b) => a.pct - b.pct).slice(0, 3);
  const opportunities = [...domainScores].filter((s) => s.pct >= 45).sort((a, b) => b.pct - a.pct).slice(0, 3);
  const flagged = [...domainScores].filter((s) => s.pct >= 45).sort((a, b) => b.pct - a.pct);

  const createdDate = assessment.createdAt?.toDate
    ? assessment.createdAt.toDate()
    : assessment.createdAt instanceof Date
    ? assessment.createdAt
    : null;

  return (
    <div>
      <button className="btn ghost sm" onClick={onBack} style={{ marginBottom: 18 }}>← Volver</button>
      <p className="eyebrow">{test.title}</p>
      <h1 style={{ fontSize: 27, marginBottom: 4 }}>{assessment.patientName}</h1>
      <p className="muted" style={{ marginBottom: 20 }}>
        {assessment.patientAge && `${assessment.patientAge} años · `}
        {createdDate ? createdDate.toLocaleDateString('es-HN') : ''}
      </p>

      <div className="overall-card">
        <div className="eyebrow" style={{ textAlign: 'center' }}>{test.overallLabel}</div>
        <div className="overall-band" style={{ background: band.tone }}>{band.label}</div>
        {band.note && <p className="overall-note">{band.note}</p>}
      </div>

      {(meta.duration || (meta.factors && meta.factors.length) || meta.note) && (
        <div className="card">
          <h3 style={{ fontSize: 17, marginBottom: 10 }}>Contexto compartido</h3>
          {meta.duration && <span className="history-pill">Tiempo: {meta.duration}</span>}
          {(meta.factors || []).map((f) => (
            <span key={f} className="history-pill">{f}</span>
          ))}
          {meta.note && <div className="history-note">"{meta.note}"</div>}
        </div>
      )}

      {originCandidates.length > 0 && (
        <div className="card">
          <h3 style={{ fontSize: 17, marginBottom: 4 }}>Dónde parece estar pesando más</h3>
          <p className="muted" style={{ marginBottom: 10 }}>No es una causa única — es una fotografía de este momento.</p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
            {originCandidates.slice(0, 2).map((s) => (
              <li key={s.code} style={{ marginBottom: 6 }}>{test.originText[s.code]}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
        {domainScores.map((s) => (
          <div key={s.code} className="card domain-card" style={{ marginBottom: 0 }}>
            <div className="row">
              <span className="name">{s.name}</span>
              <span style={{ fontWeight: 700, color: s.color }}>{s.pct}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="sw-grid">
        <div className="sw-col sw-strengths">
          <h3>✓ Lo que ya sostiene</h3>
          <ul>
            {strengths.length === 0 && <li>Ahora mismo casi todas las áreas piden atención.</li>}
            {strengths.map((s) => (
              <li key={s.code}>{test.strengthText[s.code] || s.name}</li>
            ))}
            {topSecondary.length > 0 && test.secondary && (
              <li>
                Ya identifica recursos propios ({topSecondary.map((o) => o.label.toLowerCase()).join(', ')}).
              </li>
            )}
          </ul>
        </div>
        <div className="sw-col sw-opportunities">
          <h3>↗ Para trabajar con acompañamiento</h3>
          <ul>
            {opportunities.length === 0 && <li>No hay áreas con señales fuertes por ahora.</li>}
            {opportunities.map((s) => (
              <li key={s.code}>{s.name} ({s.pct}%)</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 17, marginBottom: 10 }}>Para conversar en sesión</h3>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
          {flagged.length === 0 && <li>No hay áreas con señales fuertes por ahora.</li>}
          {flagged.map((s) => (
            <li key={s.code} style={{ marginBottom: 6 }}>
              <b>{s.name} ({s.pct}%):</b> {test.recsText[s.code]}
            </li>
          ))}
        </ul>
      </div>

      {test.secondary && (
        <div className="card">
          <h3 style={{ fontSize: 17, marginBottom: 10 }}>{test.secondary.title} · sugerencias</h3>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
            {topSecondary.length === 0 && <li>Todavía no se identifican recursos claros — buen punto de partida para sesión.</li>}
            {topSecondary.slice(0, 3).map((o) => (
              <li key={o.code} style={{ marginBottom: 6 }}>
                <b>{o.label}:</b> {test.secondary.text[o.code]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
