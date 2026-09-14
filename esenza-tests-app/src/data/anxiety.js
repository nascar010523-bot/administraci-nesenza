const it = (text) => ({ text, keyed: null });

export const anxietyTest = {
  id: 'anxiety',
  title: 'Ansiedad y Estrés',
  subtitle: 'Tamizaje por área de vida — no diagnóstico',
  color: '#8a4f66',
  scoringMode: 'frequency',
  levels: [
    { val: 0, label: 'Nunca' }, { val: 1, label: 'A veces' },
    { val: 2, label: 'Frecuentemente' }, { val: 3, label: 'Siempre' },
  ],
  factorsChecklist: [
    'Dinero o finanzas', 'Salud propia', 'Salud de un familiar', 'Relación de pareja',
    'Conflictos familiares', 'Carga de trabajo o estudios', 'Incertidumbre por el futuro',
    'Un cambio reciente importante (mudanza, pérdida, etc.)',
  ],
  durationQuestion: '¿Hace cuánto tiempo sientes esta ansiedad o estrés de forma constante?',
  domains: [
    {
      code: 'IN', name: 'Ansiedad personal', color: '#8a4f66',
      blurb: 'Cómo se siente la ansiedad por dentro, más allá de una situación puntual.',
      items: [
        it('Sientes preocupación constante aunque no haya un motivo claro.'),
        it('Te cuesta relajar la mente incluso cuando tienes tiempo libre.'),
        it('Anticipas que las cosas van a salir mal antes de que ocurran.'),
        it('Sientes inquietud o nerviosismo la mayor parte del día.'),
        it('Te resulta difícil dejar de pensar en algo que te preocupa.'),
        it('Sientes que tu ansiedad aparece incluso sin una razón específica.'),
      ],
    },
    {
      code: 'TR', name: 'Trabajo o estudios', color: '#C9A84C',
      blurb: 'Tu nivel de ansiedad relacionado con tus responsabilidades laborales o académicas.',
      items: [
        it('Sientes tensión al pensar en tus responsabilidades laborales o académicas.'),
        it('Te cuesta desconectarte del trabajo o los estudios incluso fuera de horario.'),
        it('Sientes que nunca es suficiente lo que logras en tu trabajo o estudios.'),
        it('El ambiente laboral o académico te genera ansiedad de forma frecuente.'),
        it('Postergas tareas por la ansiedad que te generan.'),
        it('Sientes miedo a cometer errores en tu trabajo o estudios.'),
      ],
    },
    {
      code: 'FA', name: 'Familia', color: '#A07850',
      blurb: 'Cómo se siente tu ansiedad en el terreno familiar.',
      items: [
        it('Las conversaciones familiares te generan tensión con frecuencia.'),
        it('Sientes que debes cumplir expectativas familiares que te resultan pesadas.'),
        it('Te preocupas de forma intensa por la situación de algún familiar.'),
        it('Evitas ciertos temas con tu familia para no generar conflicto.'),
        it('Sientes ansiedad al anticipar una reunión o conversación familiar.'),
        it('La dinámica familiar afecta tu estado de ánimo de forma notoria.'),
      ],
    },
    {
      code: 'SO', name: 'Situaciones sociales', color: '#2D6B4A',
      blurb: 'Tu nivel de ansiedad al relacionarte con otras personas.',
      items: [
        it('Te sientes ansioso/a antes de estar en un grupo de personas.'),
        it('Te preocupa de forma notoria lo que otras personas piensen de ti.'),
        it('Evitas situaciones sociales por miedo a sentirte incómodo/a o juzgado/a.'),
        it('Repasas mentalmente conversaciones pasadas buscando errores que cometiste.'),
        it('Te cuesta expresar tu opinión por miedo a la reacción de otras personas.'),
        it('Sientes alivio cuando una actividad social termina, más que disfrute.'),
      ],
    },
    {
      code: 'FI', name: 'Síntomas físicos', color: '#E8A898',
      blurb: 'Cómo se manifiesta el estrés en tu cuerpo.',
      items: [
        it('Sientes tensión muscular, dolor de cabeza o de estómago relacionado con el estrés.'),
        it('Te cuesta conciliar el sueño o descansar bien por la ansiedad.'),
        it('Notas cambios en tu apetito relacionados con el estrés.'),
        it('Sientes el corazón acelerado o la respiración agitada en momentos de ansiedad.'),
        it('Te sientes fatigado/a incluso sin haber hecho gran esfuerzo físico.'),
        it('Tu cuerpo se siente tenso la mayor parte del día.'),
      ],
    },
  ],
  secondary: {
    code: 'relief', title: 'Qué te ayuda a aliviarla',
    subtitle: 'Esto no mide riesgo — ayuda a sugerir qué priorizar cuando la ansiedad sube.',
    levels: [
      { val: 1, label: 'No me funciona' }, { val: 2, label: 'Funciona poco' },
      { val: 3, label: 'Funciona bien' }, { val: 4, label: 'Es lo que más me alivia' },
    ],
    options: [
      { code: 'respiracion', label: 'Respiración y relajación' },
      { code: 'movimiento', label: 'Movimiento físico' },
      { code: 'hablar', label: 'Hablar con alguien de confianza' },
      { code: 'organizar', label: 'Organizar y planificar' },
      { code: 'descanso', label: 'Desconexión y descanso' },
      { code: 'crear', label: 'Expresión creativa' },
    ],
    text: {
      respiracion: 'Pausar 2-3 minutos para respirar de forma lenta y consciente cuando la ansiedad sube.',
      movimiento: 'Mover el cuerpo ayuda a soltar la activación física que trae la ansiedad.',
      hablar: 'Poner en palabras lo que siente con alguien de confianza suele aliviar, aunque no resuelva la situación de fondo.',
      organizar: 'Escribir lo que le preocupa en una lista ayuda a que la mente sienta que no todo está en el aire.',
      descanso: 'Darse permiso de desconectar no es evitar el problema, es lo que permite volver con más recursos.',
      crear: 'Canalizar lo que siente en algo creativo puede ayudar a soltar tensión que cuesta poner en palabras.',
    },
  },
  bandFor(pct) {
    if (pct >= 70) return { label: 'Nivel elevado — vale la pena priorizarlo', tone: '#8a4f66',
      note: 'La ansiedad está pesando de forma importante ahora mismo. Ponerle nombre y estructura junto a su psicóloga es un paso real.' };
    if (pct >= 45) return { label: 'Nivel moderado', tone: '#C9A84C',
      note: 'Hay una carga de ansiedad presente que conviene trabajar de forma activa.' };
    if (pct >= 20) return { label: 'Nivel leve', tone: '#A07850',
      note: 'Aparecen algunas señales puntuales de ansiedad. Buen momento para poner atención.' };
    return { label: 'Nivel bajo por ahora', tone: '#2D6B4A',
      note: 'No muestra una carga fuerte de ansiedad en este momento.' };
  },
  overallLabel: 'Nivel general de ansiedad y estrés',
  originDomains: ['IN', 'TR', 'FA', 'SO'],
  originText: {
    IN: 'Una parte importante de la ansiedad parece ser más interna que situacional, presente incluso sin un disparador externo claro.',
    TR: 'El trabajo o los estudios parecen estar pesando de forma notoria en su ansiedad ahora mismo.',
    FA: 'El terreno familiar parece estar contribuyendo de forma importante a su ansiedad en este momento.',
    SO: 'Las situaciones sociales parecen ser una fuente notoria de ansiedad ahora mismo.',
  },
  recsText: {
    IN: 'Técnicas de manejo de la preocupación (diferenciar lo controlable de lo que no) pueden ayudar a que pese menos.',
    TR: 'Revisar los límites entre el tiempo laboral/académico y el descanso — la ansiedad crece sin un cierre claro del día.',
    FA: 'Explorar qué expectativas familiares siente como propias y cuáles no.',
    SO: 'Trabajar gradualmente la exposición a situaciones sociales junto con el diálogo interno que las acompaña.',
    FI: 'El cuerpo está sosteniendo bastante de esta ansiedad — revisar sueño, descanso y tensión física como parte del tratamiento.',
  },
  strengthText: {
    IN: 'Su ansiedad interna no parece estar tan presente — cierta capacidad de calma que es un recurso real.',
    TR: 'El trabajo o los estudios no parecen ser una fuente fuerte de ansiedad ahora.',
    FA: 'El terreno familiar no parece estar pesando fuerte en su ansiedad.',
    SO: 'Las situaciones sociales no le generan una ansiedad marcada.',
    FI: 'Su cuerpo no muestra señales fuertes de sobrecarga física por el estrés.',
  },
};
