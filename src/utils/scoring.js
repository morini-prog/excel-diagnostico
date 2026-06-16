import { calcularNivel, preguntas } from '../data/questions';

/**
 * Calcula el puntaje y nivel a partir de las respuestas del usuario.
 *
 * @param {number[]} respuestasUsuario - Array de índices de respuesta elegidos (0–3) por posición de pregunta
 * @returns {{
 *   correctas: number,
 *   incorrectas: number,
 *   porcentaje: number,
 *   nivel: string,
 *   indicesCorrectos: number[],
 *   indicesIncorrectos: number[],
 *   detallePorNivel: Record<string, { correctas: number, total: number }>
 * }}
 */
export function calcularPuntaje(respuestasUsuario) {
  let correctas = 0;
  const indicesCorrectos = [];
  const indicesIncorrectos = [];
  const detallePorNivel = {};

  preguntas.forEach((pregunta, index) => {
    const nivel = pregunta.nivel;
    if (!detallePorNivel[nivel]) {
      detallePorNivel[nivel] = { correctas: 0, total: 0 };
    }
    detallePorNivel[nivel].total += 1;

    if (respuestasUsuario[index] === pregunta.correcta) {
      correctas += 1;
      indicesCorrectos.push(index);
      detallePorNivel[nivel].correctas += 1;
    } else {
      indicesIncorrectos.push(index);
    }
  });

  const { nivel, porcentaje } = calcularNivel(correctas);

  return {
    correctas,
    incorrectas: preguntas.length - correctas,
    porcentaje,
    nivel,
    indicesCorrectos,
    indicesIncorrectos,
    detallePorNivel,
  };
}

/**
 * Parsea una fecha de forma segura soportando Timestamps de Firestore,
 * Timestamps serializados en JSON, objetos Date, strings ISO y fallbacks.
 * @param {any} fecha
 * @returns {Date}
 */
export function parsearFechaSafe(fecha) {
  if (!fecha) return new Date();

  // 1. Objeto Timestamp real de Firestore
  if (typeof fecha.toDate === 'function') {
    return fecha.toDate();
  }

  // 2. Objeto Timestamp serializado en JSON: { seconds: ..., nanoseconds: ... }
  if (fecha.seconds !== undefined) {
    return new Date(fecha.seconds * 1000);
  }

  // 3. Objeto Date nativo
  if (fecha instanceof Date) {
    return fecha;
  }

  // 4. String ISO o número de milisegundos
  const d = new Date(fecha);
  if (!isNaN(d.getTime())) {
    return d;
  }

  // Fallback seguro (evita invalid dates)
  return new Date();
}

/**
 * Formatea una fecha de Firestore (Timestamp o Date) para mostrar al usuario.
 * @param {object|Date|string} fecha
 * @returns {string}
 */
export function formatearFecha(fecha) {
  const d = parsearFechaSafe(fecha);
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
