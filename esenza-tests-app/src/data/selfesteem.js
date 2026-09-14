const it = (text) => ({ text, keyed: null });

export const selfesteemTest = {
  id: 'selfesteem',
  title: 'Autoestima',
  subtitle: 'Tamizaje de señales de autoestima baja — no diagnóstico',
  color: '#C9A84C',
  scoringMode: 'frequency',
  levels: [
    { val: 0, label: 'Nunca' }, { val: 1, label: 'A veces' },
    { val: 2, label: 'Frecuentemente' }, { val: 3, label: 'Siempre' },
  ],
  factorsChecklist: [
    'Crítica frecuente en la infancia o adolescencia', 'Comparaciones con hermanos/as u otras personas',
    'Un evento o etapa difícil en tu vida', 'Presión por rendimiento o logros',
    'Una relación que te hizo sentir menos', 'Ambiente laboral o académico exigente',
    'Cambios físicos o de salud', 'Redes sociales y comparación constante',
  ],
  durationQuestion: '¿Hace cuánto tiempo sientes que tu autoestima está así?',
  domains: [
    {
      code: 'VP', name: 'Valor propio', color: '#8a4f66',
      blurb: 'De dónde sientes que sale tu valor como persona.',
      items: [
        it('Sientes que no eres suficiente, aunque no sepas explicar por qué.'),
        it('Te cuesta reconocer tus propias cualidades sin minimizarlas.'),
        it('Sientes que tu valor depende de lo que logras o produces.'),
        it('Te comparas con otras personas y sales sintiéndote menos.'),
        it('Te cuesta aceptar un cumplido sin quitarle importancia.'),
        it('Sientes que debes ganarte el cariño o la aprobación de los demás.'),
      ],
    },
    {
      code: 'AI', name: 'Autoimagen', color: '#C9A84C',
      blurb: 'Cómo te ves y te aceptas a ti mismo/a, más allá de lo físico.',
      items: [
        it('Te sientes incómodo/a con partes de quién eres, más allá de lo físico.'),
        it('Evitas mirarte con honestidad — en fotos, en el espejo, al hablar de ti.'),
        it('Sientes que si las personas te conocieran de verdad, les gustarías menos.'),
        it('Te cuesta identificar qué es lo que realmente te gusta de ti mismo/a.'),
        it('Sientes vergüenza de mostrar quién eres en algunos espacios.'),
        it('Cambias tu forma de ser para encajar con lo que otros esperan de ti.'),
      ],
    },
    {
      code: 'RE', name: 'Relaciones y validación', color: '#A07850',
      blurb: 'Cuánto depende tu bienestar de la aprobación de otras personas.',
      items: [
        it('Sientes que necesitas la aprobación de otros para sentirte bien contigo mismo/a.'),
        it('Te cuesta poner límites por miedo a que dejen de quererte.'),
        it('Sientes ansiedad cuando alguien parece molesto o decepcionado contigo.'),
        it('Te cuesta expresar tus necesidades por miedo a ser una carga.'),
        it('Priorizas complacer a otros incluso cuando te afecta a ti.'),
        it('Sientes que en tus relaciones das más de lo que recibes.'),
      ],
    },
    {
      code: 'LC', name: 'Logros y competencia', color: '#2D6B4A',
      blurb: 'Cómo te relacionas con tus propios logros y capacidades.',
      items: [
        it('Sientes que tus logros no cuentan tanto como los de otras personas.'),
        it('Te cuesta reconocer tu propio esfuerzo, aunque el resultado haya sido bueno.'),
        it('Sientes miedo a intentar algo nuevo por temor a fallar.'),
        it('Piensas que un error define tu capacidad como persona.'),
        it('Sientes que nunca haces lo suficiente, sin importar cuánto logres.'),
        it('Postergas metas propias por no sentirte capaz.'),
      ],
    },
    {
      code: 'DI', name: 'Diálogo interno', color: '#E8A898',
      blurb: 'El tono con el que te hablas a ti mismo/a en tu propia mente.',
      items: [
        it('Te hablas a ti mismo/a de una forma que no le dirías a alguien que quieres.'),
        it('Repites en tu mente los errores que cometiste, incluso días después.'),
        it('Sientes una voz interna que te critica con dureza.'),
        it('Te cuesta perdonarte a ti mismo/a por equivocarte.'),
        it('Sientes que mereces menos que otras personas por tus fallas.'),
        it('Piensas mal de ti mismo/a incluso en momentos buenos.'),
      ],
    },
  ],
  secondary: {
    code: 'boost', title: 'Qué te ayuda a sostenerte',
    subtitle: 'Esto no mide riesgo — ayuda a sugerir qué priorizar cuando la autocrítica sube.',
    levels: [
      { val: 1, label: 'No me ayuda' }, { val: 2, label: 'Ayuda un poco' },
      { val: 3, label: 'Ayuda bastante' }, { val: 4, label: 'Es lo que más me sostiene' },
    ],
    options: [
      { code: 'logros', label: 'Reconocer tus logros, aunque sean pequeños' },
      { code: 'conexion', label: 'Estar con personas que te valoran tal como eres' },
      { code: 'competencia', label: 'Actividades donde te sientes capaz o hábil' },
      { code: 'autocuidado', label: 'Cuidado personal: tiempo, descanso, lo que disfrutas' },
      { code: 'autenticidad', label: 'Espacios donde puedes ser tú mismo/a sin máscara' },
      { code: 'cuerpo', label: 'Movimiento o cuidado del cuerpo desde el disfrute' },
    ],
    text: {
      logros: 'Llevar un registro simple de lo que va logrando ayuda a construir evidencia real contra la autocrítica.',
      conexion: 'Priorizar el tiempo con personas que le hacen sentir bien tal como es.',
      competencia: 'Dedicar tiempo a algo que ya se le da bien, aunque no sea "productivo".',
      autocuidado: 'Darse permiso de descansar y hacer cosas solo porque le gustan, no porque se las "ganó".',
      autenticidad: 'Buscar o proteger los espacios donde puede mostrarse sin editarse.',
      cuerpo: 'Moverse o cuidar su cuerpo desde el disfrute, no como exigencia ni castigo.',
    },
  },
  bandFor(pct) {
    if (pct >= 70) return { label: 'Señales importantes — la autocrítica está pesando mucho ahora', tone: '#8a4f66',
      note: 'La autoestima está costando sostener en este momento. No es quién es, es cómo se siente ahora — y eso se puede trabajar.' };
    if (pct >= 45) return { label: 'Señales moderadas', tone: '#C9A84C',
      note: 'Hay patrones presentes que conviene trabajar de forma activa junto a su psicóloga.' };
    if (pct >= 20) return { label: 'Señales leves', tone: '#A07850',
      note: 'Aparecen algunas señales puntuales. Buen momento para ponerles atención.' };
    return { label: 'Pocas señales por ahora', tone: '#2D6B4A',
      note: 'No muestra una autocrítica fuerte en este momento.' };
  },
  overallLabel: 'Nivel general de señales de autoestima baja',
  originDomains: ['VP', 'AI', 'RE', 'LC'],
  originText: {
    VP: 'Su sensación de valor propio parece depender bastante de factores externos en vez de sentirse estable en sí misma/o.',
    AI: 'Parece haber una dificultad importante en aceptar y mostrar quién es realmente, más allá de lo físico.',
    RE: 'Sus relaciones parecen estar cargando bastante peso en su autoestima.',
    LC: 'Su relación con sus propios logros y capacidades parece generar bastante autoexigencia y miedo al error.',
  },
  recsText: {
    VP: 'Trabajar de dónde sale su sentido de valor, y separarlo de lo que logra o produce.',
    AI: 'Explorar qué partes de sí siente que debe esconder, y por qué.',
    RE: 'Practicar poner límites pequeños y observar qué pasa realmente al hacerlo.',
    LC: 'Trabajar una relación más compasiva con el error, como parte de aprender.',
    DI: 'La voz interna crítica se puede trabajar directamente en terapia: identificarla, cuestionarla, practicar un tono más compasivo.',
  },
  strengthText: {
    VP: 'Su sentido de valor propio no depende tan fuerte de factores externos.',
    AI: 'Tiene una relación relativamente honesta con quién es.',
    RE: 'No depende tan fuerte de la aprobación externa para sentirse bien.',
    LC: 'Su relación con sus logros no muestra señales fuertes de autoexigencia.',
    DI: 'Su diálogo interno no parece ser tan duro consigo misma/o.',
  },
};
