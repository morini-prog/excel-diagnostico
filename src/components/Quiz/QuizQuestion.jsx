import { useState } from 'react';

const LETRAS = ['A', 'B', 'C', 'D'];

/**
 * Componente de una sola pregunta con opciones de selección múltiple.
 * @param {object} pregunta - Objeto pregunta del banco de preguntas
 * @param {function} onResponder - Callback con el índice de la opción elegida
 * @param {number} index - Índice global de la pregunta (0-based)
 */
export default function QuizQuestion({ pregunta, onResponder, index }) {
  const [seleccionada, setSeleccionada] = useState(null);

  const handleOpcion = (opcionIndex) => {
    if (seleccionada !== null) return; // evitar doble click
    setSeleccionada(opcionIndex);
    setTimeout(() => {
      onResponder(opcionIndex);
      setSeleccionada(null);
    }, 400);
  };

  const coloresNivel = {
    Inicial: 'border-sky-500/50 bg-sky-500/10 text-sky-400',
    Básico: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
    Intermedio: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
    Avanzado: 'border-violet-500/50 bg-violet-500/10 text-violet-400',
    Experto: 'border-rose-500/50 bg-rose-500/10 text-rose-400',
  };

  const badgeColor = coloresNivel[pregunta.nivel] || coloresNivel.Básico;

  return (
    <div className="animate-fadeIn">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-5">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}>
          {pregunta.nivel}
        </span>
        <span className="text-xs text-slate-500 px-2 py-1 rounded-full border border-slate-700 bg-slate-800/50">
          {pregunta.categoria}
        </span>
      </div>

      {/* Pregunta */}
      <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed mb-6">
        {index + 1}. {pregunta.pregunta}
      </h3>

      {/* Opciones */}
      <div className="space-y-3">
        {pregunta.opciones.map((opcion, i) => {
          const esSeleccionada = seleccionada === i;
          return (
            <button
              key={i}
              onClick={() => handleOpcion(i)}
              id={`opcion-${index}-${i}`}
              className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group
                ${
                  esSeleccionada
                    ? 'border-emerald-500 bg-emerald-500/15 scale-[1.01]'
                    : 'border-slate-700 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-700/50'
                }
              `}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-colors ${
                  esSeleccionada
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-600 text-slate-400 group-hover:border-slate-400'
                }`}
              >
                {LETRAS[i]}
              </span>
              <span className={`text-sm sm:text-base leading-relaxed ${esSeleccionada ? 'text-white' : 'text-slate-300'}`}>
                {opcion}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
