/**
 * Barra de progreso animada que muestra el avance en el quiz.
 * @param {number} actual - Número de pregunta actual (1-based)
 * @param {number} total - Total de preguntas
 * @param {string} nivel - Nivel actual de la pregunta
 */
export default function ProgressBar({ actual, total, nivel }) {
  const porcentaje = Math.round(((actual - 1) / total) * 100);

  const coloresNivel = {
    Inicial: 'from-sky-500 to-blue-600',
    Básico: 'from-emerald-500 to-teal-600',
    Intermedio: 'from-amber-500 to-orange-600',
    Avanzado: 'from-violet-500 to-purple-600',
    Experto: 'from-rose-500 to-pink-600',
  };

  const color = coloresNivel[nivel] || 'from-emerald-500 to-teal-600';

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400 font-medium">
          Pregunta <span className="text-white font-bold">{actual}</span> de{' '}
          <span className="text-white font-bold">{total}</span>
        </span>
        <span className="text-slate-400">
          Nivel:{' '}
          <span className={`font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {nivel}
          </span>
        </span>
      </div>
      <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out`}
          style={{ width: `${porcentaje}%` }}
          role="progressbar"
          aria-valuenow={porcentaje}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex justify-between">
        {['Inicial', 'Básico', 'Intermedio', 'Avanzado', 'Experto'].map((n, i) => {
          const nivelActualIndex = ['Inicial', 'Básico', 'Intermedio', 'Avanzado', 'Experto'].indexOf(nivel);
          const isDone = i < nivelActualIndex;
          const isCurrent = i === nivelActualIndex;
          return (
            <span
              key={n}
              className={`text-[10px] font-medium transition-colors ${
                isDone
                  ? 'text-emerald-400'
                  : isCurrent
                  ? 'text-white'
                  : 'text-slate-600'
              }`}
            >
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}
