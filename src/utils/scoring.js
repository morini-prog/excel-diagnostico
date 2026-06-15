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
 * Formatea una fecha de Firestore (Timestamp o Date) para mostrar al usuario.
 * @param {object|Date} fecha
 * @returns {string}
 */
export function formatearFecha(fecha) {
  if (!fecha) return '—';
  const d = fecha.toDate ? fecha.toDate() : new Date(fecha);
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
