/**
 * Banco de preguntas para el diagnóstico de habilidades en Excel.
 * 5 niveles × 5 preguntas = 25 preguntas en total.
 * Cada pregunta tiene: id, nivel, categoría, texto, opciones (a/b/c/d) y respuesta correcta.
 */

export const NIVELES = ['Inicial', 'Básico', 'Intermedio', 'Avanzado', 'Experto'];

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
    pregunta:
      '¿Cuál es el resultado de =SI(5>3, "Mayor", "Menor")?',
    opciones: ['Menor', 'Mayor', 'Error', 'VERDADERO'],
    correcta: 1,
  },
  {
    id: 12,
    nivel: 'Intermedio',
    categoria: 'Búsqueda',
    pregunta:
      'En =BUSCARV(valor, tabla, col_índice, FALSO), ¿qué indica el argumento FALSO?',
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

  // ─────────────────────────────────────────────────────
  //  NIVEL 4 — AVANZADO
  // ─────────────────────────────────────────────────────
  {
    id: 16,
    nivel: 'Avanzado',
    categoria: 'Fórmulas matriciales',
    pregunta:
      '¿Cuál es la diferencia entre una fórmula normal y una fórmula matricial (array formula)?',
    opciones: [
      'Las fórmulas matriciales solo funcionan en Excel 365',
      'Las fórmulas matriciales pueden realizar cálculos sobre múltiples valores y devolver uno o varios resultados',
      'Las fórmulas matriciales no pueden usar funciones como SUMA o PROMEDIO',
      'Las fórmulas matriciales son exclusivamente para fines estadísticos',
    ],
    correcta: 1,
  },
  {
    id: 17,
    nivel: 'Avanzado',
    categoria: 'Automatización',
    pregunta: '¿Qué es una macro en Excel y para qué se utiliza?',
    opciones: [
      'Es un tipo especial de gráfico interactivo',
      'Es una función que solo está disponible en la versión de pago',
      'Es una secuencia de instrucciones VBA que automatiza tareas repetitivas',
      'Es una plantilla con formato predefinido',
    ],
    correcta: 2,
  },
  {
    id: 18,
    nivel: 'Avanzado',
    categoria: 'Funciones avanzadas',
    pregunta:
      '¿Qué devuelve la función =INDICE(A1:C5, 3, 2)?',
    opciones: [
      'El valor de la celda A3',
      'El valor de la celda en la fila 3 y columna 2 del rango A1:C5',
      'El número de filas del rango A1:C5',
      'Un error, porque ÍNDICE requiere COINCIDIR',
    ],
    correcta: 1,
  },
  {
    id: 19,
    nivel: 'Avanzado',
    categoria: 'Análisis de datos',
    pregunta: '¿Cuál de las siguientes herramientas de Excel permite resolver problemas de optimización cambiando variables de decisión?',
    opciones: ['Buscar objetivo', 'Solver', 'Power Query', 'Análisis de hipótesis'],
    correcta: 1,
  },
  {
    id: 20,
    nivel: 'Avanzado',
    categoria: 'Power Query',
    pregunta: '¿Cuál es la función principal de Power Query en Excel?',
    opciones: [
      'Crear gráficos dinámicos avanzados',
      'Importar, transformar y limpiar datos de múltiples fuentes antes de cargarlos en Excel',
      'Ejecutar macros programadas en horarios específicos',
      'Conectar Excel con bases de datos solo de Microsoft',
    ],
    correcta: 1,
  },

  // ─────────────────────────────────────────────────────
  //  NIVEL 5 — EXPERTO
  // ─────────────────────────────────────────────────────
  {
    id: 21,
    nivel: 'Experto',
    categoria: 'VBA',
    pregunta:
      '¿Cuál de los siguientes fragmentos de VBA recorre todas las celdas de un rango y colorea en rojo las que contienen un valor mayor a 100?',
    opciones: [
      'For Each c In Range("A1:A10") : If c > 100 Then c.Font.Color = RGB(255,0,0) : Next c',
      'For Each c In Range("A1:A10") : If c > 100 Then c.Interior.Color = RGB(255,0,0) : Next c',
      'Do While c < 100 : c.Interior.Color = RGB(255,0,0) : Loop',
      'Range("A1:A10").ColorIndex = 3 If Value > 100',
    ],
    correcta: 1,
  },
  {
    id: 22,
    nivel: 'Experto',
    categoria: 'Funciones dinámicas',
    pregunta:
      '¿Qué función de Excel 365 devuelve un rango de valores únicos eliminando duplicados automáticamente?',
    opciones: ['=UNICOS()', '=SIN.DUPLICADOS()', '=DISTINTOS()', '=FILTRAR.UNICOS()'],
    correcta: 0,
  },
  {
    id: 23,
    nivel: 'Experto',
    categoria: 'Power Pivot',
    pregunta: '¿Qué es DAX en el contexto de Power Pivot de Excel?',
    opciones: [
      'Un formato de archivo para exportar datos de Excel',
      'Un lenguaje de fórmulas para crear métricas y columnas calculadas en modelos de datos',
      'Un protocolo de conexión a bases de datos externas',
      'Una extensión de VBA para macros avanzadas',
    ],
    correcta: 1,
  },
  {
    id: 24,
    nivel: 'Experto',
    categoria: 'Automatización avanzada',
    pregunta:
      '¿Cuál es la diferencia entre un procedimiento Sub y una Function en VBA?',
    opciones: [
      'Sub solo puede ejecutarse desde un botón; Function solo desde el Editor',
      'Sub realiza acciones sin devolver un valor; Function devuelve un valor que puede usarse en fórmulas',
      'Sub es más rápido que Function en todos los casos',
      'No hay diferencia funcional, solo de nomenclatura',
    ],
    correcta: 1,
  },
  {
    id: 25,
    nivel: 'Experto',
    categoria: 'Fórmulas anidadas',
    pregunta:
      '¿Cuál de las siguientes fórmulas calcula el promedio de las ventas (columna B) solo cuando el producto (columna A) es "Laptop" y la región (columna C) es "Sur"?',
    opciones: [
      '=PROMEDIO.SI(A:A,"Laptop",B:B)',
      '=PROMEDIO.SI.CONJUNTO(B:B, A:A,"Laptop", C:C,"Sur")',
      '=SUMAR.SI(B:B, A:A,"Laptop", C:C,"Sur")/CONTAR.SI(A:A,"Laptop")',
      '=SI(Y(A:A="Laptop",C:C="Sur"),PROMEDIO(B:B),0)',
    ],
    correcta: 1,
  },
];

/**
 * Recomendaciones específicas por nivel y categoría.
 * Usadas en la pantalla de resultados para guiar al estudiante.
 */
export const recomendaciones = {
  Inicial: [
    'Familiarízate con la interfaz de Excel: cinta de opciones, barra de fórmulas y tipos de celdas.',
    'Practica las fórmulas básicas: SUMA, PROMEDIO, MIN y MAX.',
    'Aprende los atajos de teclado más usados: Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+Inicio.',
    'Completa el curso gratuito "Excel para principiantes" de Microsoft Learn.',
  ],
  Básico: [
    'Profundiza en referencias absolutas ($A$1) y mixtas ($A1 o A$1).',
    'Practica las funciones CONTAR, CONTARA y CONTAR.SI para análisis de datos.',
    'Aprende a inmovilizar paneles y trabajar con múltiples hojas.',
    'Usa la función de Autocompletar y Relleno rápido para ser más eficiente.',
  ],
  Intermedio: [
    'Domina BUSCARV y su alternativa moderna BUSCARX para cruzar datos.',
    'Crea tablas dinámicas para resumir grandes conjuntos de datos fácilmente.',
    'Aplica formato condicional para visualizar tendencias de forma automática.',
    'Practica las funciones de texto: IZQUIERDA, DERECHA, EXTRAE, CONCATENAR.',
  ],
  Avanzado: [
    'Aprende la combinación ÍNDICE + COINCIDIR como alternativa flexible a BUSCARV.',
    'Explora Power Query para automatizar la importación y limpieza de datos.',
    'Utiliza Solver para resolver problemas de optimización y toma de decisiones.',
    'Introduce las fórmulas matriciales (CSE) para cálculos multidimensionales.',
  ],
  Experto: [
    'Perfecciona tus macros VBA añadiendo manejo de errores y módulos reutilizables.',
    'Explora DAX en Power Pivot para construir modelos de datos complejos y KPIs.',
    'Usa las funciones dinámicas de Excel 365: UNICOS, FILTRAR, ORDENAR, SECUENCIA.',
    'Comparte tu conocimiento: crea plantillas, documenta procesos y entrena a otros.',
  ],
};

/**
 * Determina el nivel alcanzado basándose en el porcentaje de aciertos.
 * @param {number} correctas - Número de respuestas correctas (0–25)
 * @returns {{ nivel: string, porcentaje: number }}
 */
export function calcularNivel(correctas) {
  const total = preguntas.length; // 25
  const porcentaje = Math.round((correctas / total) * 100);

  let nivel;
  if (porcentaje < 20) nivel = 'Inicial';
  else if (porcentaje < 40) nivel = 'Básico';
  else if (porcentaje < 60) nivel = 'Intermedio';
  else if (porcentaje < 80) nivel = 'Avanzado';
  else nivel = 'Experto';

  return { nivel, porcentaje };
}
