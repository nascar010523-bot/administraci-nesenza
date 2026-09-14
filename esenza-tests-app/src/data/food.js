const it = (text) => ({ text, keyed: null });

export const foodTest = {
  id: 'food',
  title: 'Relación con la Alimentación',
  subtitle: 'Tamizaje de señales de riesgo — no diagnóstico',
  color: '#E8A898',
  scoringMode: 'frequency',
  levels: [
    { val: 0, label: 'Nunca' }, { val: 1, label: 'A veces' },
    { val: 2, label: 'Frecuentemente' }, { val: 3, label: 'Siempre' },
  ],
  factorsChecklist: null,
  durationQuestion: '¿Hace cuánto tiempo sientes esto de forma constante?',
  domains: [
    {
      code: 'IC', name: 'Imagen corporal', color: '#A07850',
      blurb: 'Cómo te sientes con tu cuerpo y cuánto espacio ocupa ese pensamiento.',
      items: [
        it('Piensas en tu peso o en tu cuerpo con una frecuencia que te resulta agotadora.'),
        it('Te sientes incómodo/a con tu cuerpo incluso cuando otras personas te dicen que te ves bien.'),
        it('Te comparas con el cuerpo de otras personas y sales perdiendo en esa comparación.'),
        it('Revisas tu cuerpo en el espejo, en fotos o con la ropa, más de lo que quisieras.'),
        it('Sientes que tu valor como persona depende de tu peso o tu apariencia.'),
        it('Evitas situaciones sociales por cómo te sientes con tu cuerpo.'),
      ],
    },
    {
      code: 'CO', name: 'Control alimentario', color: '#C9A84C',
      blurb: 'Tu forma de manejar (o sentir que pierdes el manejo de) lo que comes.',
      items: [
        it('Sientes que necesitas controlar de forma estricta lo que comes para sentirte tranquilo/a.'),
        it('Te saltas comidas o restringes lo que comes cuando te sientes emocionalmente mal.'),
        it('Sientes que pierdes el control al comer y después te arrepientes.'),
        it('Después de comer, sientes la necesidad de compensarlo de alguna manera.'),
        it('Sigues reglas alimentarias propias muy rígidas, aunque te generen malestar.'),
        it('El tiempo y la energía que dedicas a pensar en comida interfieren con otras áreas de tu vida.'),
      ],
    },
    {
      code: 'EM', name: 'Impacto emocional', color: '#8a4f66',
      blurb: 'La carga emocional que la comida tiene para ti en este momento.',
      items: [
        it('Sientes culpa o vergüenza después de comer.'),
        it('La comida es una fuente de ansiedad más que de disfrute para ti.'),
        it('Tu estado de ánimo cambia mucho dependiendo de lo que comiste o no comiste.'),
        it('Te cuesta relajarte o disfrutar una comida sin pensar en sus consecuencias.'),
        it('Sientes que "fallaste" cuando comes algo que consideras prohibido.'),
      ],
    },
    {
      code: 'AS', name: 'Soledad y percepción social', color: '#2D6B4A',
      blurb: 'Si esto se vive en silencio, o si sientes el juicio de otras personas.',
      items: [
        it('Evitas comer frente a otras personas.'),
        it('Ocultas o disimulas tus hábitos alimentarios ante familiares o amigos.'),
        it('Sientes que las personas cercanas a ti te juzgan por cómo comes o por tu cuerpo.'),
        it('Te sientes solo/a con lo que te pasa con la comida, como si nadie pudiera entenderlo.'),
        it('Te has alejado de amigos o actividades sociales por temas de comida o cuerpo.'),
        it('Sientes que no podrías hablar de esto abiertamente con alguien de confianza.'),
      ],
    },
    {
      code: 'FN', name: 'Impacto en tu día a día', color: '#E8A898',
      blurb: 'Qué tanto se ha extendido esto hacia otras áreas de tu vida.',
      items: [
        it('Lo que sientes con la comida o tu cuerpo afecta tu rendimiento en el trabajo o los estudios.'),
        it('Has notado cambios en tu energía, sueño o concentración que asocias con tus hábitos alimentarios.'),
        it('Tus relaciones cercanas se han visto afectadas por esta situación.'),
        it('Sientes que esto ha estado presente durante varios meses, no solo unos días.'),
      ],
    },
  ],
  secondary: {
    code: 'likes', title: 'Lo que te gusta',
    subtitle: 'Esto no mide riesgo — ayuda a sugerir alternativas reales al usar la comida para calmarte o castigarte.',
    levels: [
      { val: 1, label: 'No me atrae' }, { val: 2, label: 'Me atrae un poco' },
      { val: 3, label: 'Me atrae bastante' }, { val: 4, label: 'Ya lo disfruto mucho' },
    ],
    options: [
      { code: 'movimiento', label: 'Moverte de una forma que disfrutas' },
      { code: 'creativo', label: 'Actividades creativas' },
      { code: 'social', label: 'Estar con gente que te hace sentir bien' },
      { code: 'sensorial', label: 'Rituales que te calman los sentidos' },
      { code: 'logro', label: 'Hacer algo que te da sensación de logro' },
    ],
    text: {
      movimiento: 'Cuando sienta ganas de usar la comida para calmarse o de castigarse evitando comer, moverse de una forma que disfrute — no como castigo ni compensación.',
      creativo: 'Canalizar la emoción en algo creativo que le guste: dibujar, escribir, cocinar por gusto, poner música.',
      social: 'Buscar a alguien que le haga sentir acompañado/a. Muchas veces lo que se busca en la comida es compañía.',
      sensorial: 'Un ritual sensorial que reconforte: un baño caliente, una fragancia, una manta suave, música tranquila.',
      logro: 'Canalizar la energía en algo con sensación de logro pequeño y alcanzable: ordenar, avanzar en algo propio, aprender.',
    },
  },
  bandFor(pct) {
    if (pct >= 70) return { label: 'Señales importantes — evaluación profesional prioritaria', tone: '#8a4f66',
      note: 'Varias señales que conviene atender pronto, idealmente con apoyo nutricional también. No es una sentencia — es información para empezar a cuidarse mejor, cuanto antes.' };
    if (pct >= 45) return { label: 'Señales moderadas — vale la pena conversarlo', tone: '#C9A84C',
      note: 'Hay patrones presentes que conviene poner en palabras en sesión.' };
    if (pct >= 20) return { label: 'Señales leves', tone: '#A07850',
      note: 'Aparecen algunas señales puntuales. Buen tema para mencionar en sesión.' };
    return { label: 'Sin señales significativas por ahora', tone: '#2D6B4A',
      note: 'No hay señales relevantes en este momento. Sigue siendo un tema válido si algo cambia.' };
  },
  overallLabel: 'Nivel general de señales',
  originDomains: ['IC', 'CO', 'EM'],
  originText: {
    IC: 'Preocupación por la imagen corporal: buena parte del malestar parece conectado con cómo se ve y se siente con su cuerpo, más que con la comida en sí misma.',
    CO: 'Control alimentario: relación con la comida marcada por el control, la restricción o la sensación de perder el control al comer.',
    EM: 'Carga emocional alrededor de la comida: parece funcionar como un lugar donde se depositan emociones difíciles.',
  },
  recsText: {
    IC: 'Trabajar la autocompasión y cuestionar el "ideal" con el que se compara puede aliviar bastante esa carga.',
    CO: 'Casi nunca se resuelve con "fuerza de voluntad" — vale la pena explorarlo con acompañamiento profesional, incluyendo apoyo nutricional.',
    EM: 'Trabajar las emociones directamente, no solo los hábitos alrededor de la comida, suele ser el camino más efectivo.',
    AS: 'Encontrar un espacio donde pueda hablarlo sin miedo a ser juzgado/a puede aliviar una parte importante de la carga.',
    FN: 'Ya está tocando otras áreas de la vida — es momento de priorizar el acompañamiento profesional.',
  },
  strengthText: {
    IC: 'Su relación con su imagen corporal, aunque no perfecta, no está tan cargada como en otras áreas.',
    CO: 'No muestra patrones marcados de control extremo o pérdida de control con la comida.',
    EM: 'La comida no parece estar tan atada a culpa o ansiedad.',
    AS: 'No se siente tan sola/o o juzgada/o en esto.',
    FN: 'Esto todavía no está afectando fuertemente su día a día.',
  },
};
