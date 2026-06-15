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
  };

  const color = coloresNivel[nivel] || 'from-emerald-500 to-teal-600';

  const nivelesActivos = ['Inicial', 'Básico', 'Intermedio'];

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400 font-medium">
          Pregunta <span className="text-white font-black">{actual}</span> de{' '}
          <span className="text-white font-black">{total}</span>
        </span>
        <span className="text-slate-400">
          Nivel:{' '}
          <span className={`font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {nivel}
          </span>
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out`}
          style={{ width: `${porcentaje}%` }}
          role="progressbar"
          aria-valuenow={porcentaje}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex justify-between px-1">
        {nivelesActivos.map((n, i) => {
          const nivelActualIndex = nivelesActivos.indexOf(nivel);
          const isDone = i < nivelActualIndex;
          const isCurrent = i === nivelActualIndex;
          return (
            <span
              key={n}
              className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${
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
