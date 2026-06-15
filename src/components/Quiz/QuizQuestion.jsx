import { useState } from 'react';

const LETRAS = ['A', 'B', 'C', 'D'];

/**
 * Componente de una sola pregunta con opciones de selección múltiple y feedback inmediato.
 * @param {object} pregunta - Objeto pregunta del banco de preguntas
 * @param {function} onResponder - Callback con el índice de la opción elegida
 * @param {function} onRespuestaClick - Callback para avisar al padre si fue correcta
 * @param {number} index - Índice global de la pregunta (0-based)
 */
export default function QuizQuestion({ pregunta, onResponder, onRespuestaClick, index }) {
  const [seleccionada, setSeleccionada] = useState(null);

  const handleOpcion = (opcionIndex) => {
    if (seleccionada !== null) return; // evitar doble click
    setSeleccionada(opcionIndex);
    
    const esCorrecta = opcionIndex === pregunta.correcta;
    if (onRespuestaClick) {
      onRespuestaClick(esCorrecta);
    }

    setTimeout(() => {
      onResponder(opcionIndex);
      setSeleccionada(null);
    }, 1500); // Dar 1.5s para ver el feedback de Excelito y la respuesta
  };

  const coloresNivel = {
    Inicial: 'border-sky-500/50 bg-sky-500/10 text-sky-400',
    Básico: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
    Intermedio: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
  };

  const badgeColor = coloresNivel[pregunta.nivel] || coloresNivel.Básico;

  return (
    <div className="animate-fadeIn">
      {/* Badges de Nivel y Categoría */}
      <div className="flex items-center gap-2 mb-5">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}>
          Nivel: {pregunta.nivel}
        </span>
        <span className="text-xs text-slate-500 px-2 py-1 rounded-full border border-slate-700 bg-slate-800/50">
          Categoría: {pregunta.categoria}
        </span>
      </div>

      {/* Enunciado de la Pregunta */}
      <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
        {index + 1}. {pregunta.pregunta}
      </h3>

      {/* Opciones con feedback visual en tiempo real */}
      <div className="space-y-3">
        {pregunta.opciones.map((opcion, i) => {
          const esSeleccionada = seleccionada === i;
          const esCorrecta = pregunta.correcta === i;
          
          const contestado = seleccionada !== null;
          const mostrarCorrecta = contestado && esCorrecta;
          const mostrarIncorrecta = contestado && esSeleccionada && !esCorrecta;
          const noElegida = contestado && !esSeleccionada && !esCorrecta;

          let btnClass = 'border-slate-700 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-700/50';
          let badgeClass = 'border-slate-600 text-slate-400 group-hover:border-slate-400';

          if (mostrarCorrecta) {
            btnClass = 'border-emerald-500 bg-emerald-500/20 scale-[1.01] ring-2 ring-emerald-500/50';
            badgeClass = 'border-emerald-500 bg-emerald-500 text-white';
          } else if (mostrarIncorrecta) {
            btnClass = 'border-rose-500 bg-rose-500/20 scale-[1.01] ring-2 ring-rose-500/50';
            badgeClass = 'border-rose-500 bg-rose-500 text-white';
          } else if (noElegida) {
            btnClass = 'border-slate-800/60 bg-slate-900/20 opacity-40 cursor-not-allowed';
            badgeClass = 'border-slate-800 text-slate-600';
          }

          return (
            <button
              key={i}
              onClick={() => handleOpcion(i)}
              id={`opcion-${index}-${i}`}
              disabled={contestado}
              className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group ${btnClass}`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-colors ${badgeClass}`}
              >
                {LETRAS[i]}
              </span>
              <span className={`text-sm sm:text-base leading-relaxed ${esSeleccionada ? 'text-white font-medium' : 'text-slate-300'}`}>
                {opcion}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
