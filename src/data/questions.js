/**
 * Banco de preguntas para el diagnóstico de habilidades en Excel.
 * 3 niveles × 5 preguntas = 15 preguntas en total.
 * Cada pregunta tiene: id, nivel, categoría, texto, opciones (a/b/c/d) y respuesta correcta.
 */

export const NIVELES = ['Inicial', 'Básico', 'Intermedio'];

export const RANGOS = [
  { min: 0, max: 9, rango: 'Desconocedor', rangoLabel: 'Desconocedor (Rango 1)' },
  { min: 10, max: 19, rango: 'Novato', rangoLabel: 'Novato (Rango 2)' },
  { min: 20, max: 34, rango: 'Aprendiz', rangoLabel: 'Aprendiz (Rango 3)' },
  { min: 35, max: 59, rango: 'Practicante', rangoLabel: 'Practicante (Rango 4)' },
  { min: 60, max: 74, rango: 'Avanzado', rangoLabel: 'Avanzado (Rango 5)' },
  { min: 75, max: 89, rango: 'Maestro de Fórmulas', rangoLabel: 'Maestro de Fórmulas (Rango 6)' },
  { min: 90, max: 100, rango: 'Experto', rangoLabel: 'Experto (Rango 7)' }
];

export const preguntas = [
  // ─────────────────────────────────────────────────────
  //  NIVEL 1 — INICIAL
  // ─────────────────────────────────────────────────────
  {
    id: 1,
    nivel: 'Inicial',
    categoria: 'Interfaz',
    pregunta: '¿Cuál es la intersección entre una fila y una columna en Excel?',
    opciones: ['Hoja', 'Celda', 'Libro', 'Rango'],
    correcta: 1,
  },
  {
    id: 2,
    nivel: 'Inicial',
    categoria: 'Fórmulas básicas',
    pregunta: '¿Cuál de las siguientes fórmulas calcula correctamente la SUMA de las celdas A1 hasta A5?',
    opciones: ['=SUMA(A1-A5)', '=SUMA(A1:A5)', '=SUMA[A1,A5]', '=TOTAL(A1:A5)'],
    correcta: 1,
  },
  {
    id: 3,
    nivel: 'Inicial',
    categoria: 'Formato',
    pregunta: '¿Qué extensión tienen por defecto los archivos de Excel 2016 en adelante?',
    opciones: ['.xls', '.xlm', '.xlsx', '.xlt'],
    correcta: 2,
  },
  {
    id: 4,
    nivel: 'Inicial',
    categoria: 'Navegación',
    pregunta: '¿Qué combinación de teclas permite ir directamente a la celda A1?',
    opciones: ['Ctrl + Inicio', 'Alt + A1', 'Ctrl + A', 'Shift + Inicio'],
    correcta: 0,
  },
  {
    id: 5,
    nivel: 'Inicial',
    categoria: 'Formato',
    pregunta: '¿Cuál de estas acciones aplica negrita al texto de una celda seleccionada?',
    opciones: ['Ctrl + I', 'Ctrl + B', 'Ctrl + N', 'Ctrl + U'],
    correcta: 1,
  },

  // ─────────────────────────────────────────────────────
  //  NIVEL 2 — BÁSICO
  // ─────────────────────────────────────────────────────
  {
    id: 6,
    nivel: 'Básico',
    categoria: 'Fórmulas',
    pregunta: '¿Qué función devuelve el valor máximo de un rango de celdas?',
    opciones: ['=MAYOR(A1:A10)', '=MAXIMO(A1:A10)', '=MAX(A1:A10)', '=CIMA(A1:A10)'],
    correcta: 2,
  },
  {
    id: 7,
    nivel: 'Básico',
    categoria: 'Referencia',
    pregunta: 'En la fórmula =A1*$B$1, ¿qué tipo de referencia es $B$1?',
    opciones: ['Relativa', 'Mixta', 'Absoluta', 'Circular'],
    correcta: 2,
  },
  {
    id: 8,
    nivel: 'Básico',
    categoria: 'Funciones',
    pregunta: '¿Qué función cuenta únicamente las celdas que contienen números en un rango?',
    opciones: ['=CONTARA()', '=CONTAR()', '=CONTAR.SI()', '=CONTAR.BLANCO()'],
    correcta: 1,
  },
  {
    id: 9,
    nivel: 'Básico',
    categoria: 'Formato',
    pregunta: '¿Qué hace la opción "Inmovilizar paneles" en Excel?',
    opciones: [
      'Oculta las filas y columnas seleccionadas',
      'Bloquea el desplazamiento de filas/columnas para que siempre sean visibles',
      'Protege la hoja con contraseña',
      'Une varias celdas en una sola',
    ],
    correcta: 1,
  },
  {
    id: 10,
    nivel: 'Básico',
    categoria: 'Atajos',
    pregunta: '¿Qué combinación de teclas inserta la fecha actual en una celda?',
    opciones: ['Ctrl + T', 'Ctrl + ;', 'Ctrl + Shift + ;', 'Alt + D'],
    correcta: 1,
  },

  // ─────────────────────────────────────────────────────
  //  NIVEL 3 — INTERMEDIO
  // ─────────────────────────────────────────────────────
  {
    id: 11,
    nivel: 'Intermedio',
    categoria: 'Funciones lógicas',
    pregunta: '¿Cuál es el resultado de =SI(5>3, "Mayor", "Menor")?',
    opciones: ['Menor', 'Mayor', 'Error', 'VERDADERO'],
    correcta: 1,
  },
  {
    id: 12,
    nivel: 'Intermedio',
    categoria: 'Búsqueda',
    pregunta: 'En =BUSCARV(valor, tabla, col_índice, FALSO), ¿qué indica el argumento FALSO?',
    opciones: [
      'Que la tabla está ordenada de forma descendente',
      'Que se busca una coincidencia aproximada',
      'Que se busca una coincidencia exacta',
      'Que el rango es dinámico',
    ],
    correcta: 2,
  },
  {
    id: 13,
    nivel: 'Intermedio',
    categoria: 'Análisis de datos',
    pregunta: '¿Para qué sirve la herramienta "Tabla dinámica" (PivotTable) en Excel?',
    opciones: [
      'Para crear gráficos animados',
      'Para resumir, analizar y explorar grandes volúmenes de datos',
      'Para aplicar formato condicional automático',
      'Para importar datos desde una base de datos SQL',
    ],
    correcta: 1,
  },
  {
    id: 14,
    nivel: 'Intermedio',
    categoria: 'Formato condicional',
    pregunta: '¿Cuál es el propósito del formato condicional en Excel?',
    opciones: [
      'Cambiar el formato de una celda de forma permanente',
      'Aplicar estilos visuales a celdas según el valor o condición que cumplan',
      'Proteger las celdas con una contraseña',
      'Convertir texto en fórmulas automáticamente',
    ],
    correcta: 1,
  },
  {
    id: 15,
    nivel: 'Intermedio',
    categoria: 'Funciones de texto',
    pregunta: '¿Qué función extrae un número específico de caracteres desde la izquierda de una cadena de texto?',
    opciones: ['=DERECHA()', '=EXTRAE()', '=IZQUIERDA()', '=LARGO()'],
    correcta: 2,
  },
];

/**
 * Recomendaciones específicas por nivel y categoría.
 * Usadas en la pantalla de resultados para guiar al estudiante.
 */
export const recomendaciones = {
  Inicial: [
    'Familiarízate con la interfaz de Excel: la cinta de opciones, la barra de fórmulas y los tipos de datos en celdas.',
    'Practica las fórmulas aritméticas básicas y funciones elementales: SUMA, PROMEDIO, MIN y MAX.',
    'Aprende los atajos de teclado esenciales de navegación y formato en celdas.',
  ],
  Básico: [
    'Domina el uso de referencias absolutas ($A$1) para fijar celdas al copiar fórmulas.',
    'Practica las funciones de conteo CONTAR, CONTARA y CONTAR.SI para filtrar datos iniciales.',
    'Utiliza la inmovilización de paneles para mantener visibles tus encabezados de filas y columnas.',
  ],
  Intermedio: [
    'Domina la función de búsqueda BUSCARV (y BUSCARX) con coincidencia exacta (argumento FALSO).',
    'Crea tablas dinámicas básicas para resumir y analizar bases de datos extensas.',
    'Aplica formato condicional basado en reglas de celda para resaltar tendencias visualmente.',
    'Practica funciones lógicas como =SI() anidadas y funciones de texto avanzadas.',
  ],
};

/**
 * Determina el nivel alcanzado basándose en el porcentaje de aciertos.
 * @param {number} correctas - Número de respuestas correctas (0–15)
 * @returns {{ nivel: string, porcentaje: number }}
 */
export function calcularNivel(correctas) {
  const total = preguntas.length; // 15
  const porcentaje = Math.round((correctas / total) * 100);

  let nivel;
  if (porcentaje < 10) nivel = 'Desconocedor';
  else if (porcentaje < 20) nivel = 'Novato';
  else if (porcentaje < 35) nivel = 'Aprendiz';
  else if (porcentaje < 60) nivel = 'Practicante';
  else if (porcentaje < 75) nivel = 'Avanzado';
  else if (porcentaje < 90) nivel = 'Maestro de Fórmulas';
  else nivel = 'Experto';

  return { nivel, porcentaje };
}
