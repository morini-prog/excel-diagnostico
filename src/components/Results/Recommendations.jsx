import { recomendaciones } from '../../data/questions';

/**
 * Muestra las recomendaciones de mejora según el nivel alcanzado.
 * @param {string} nivel - Nivel alcanzado por el estudiante
 * @param {object} detallePorNivel - { Inicial: { correctas, total }, ... }
 */
export default function Recommendations({ nivel, detallePorNivel }) {
  const recs = recomendaciones[nivel] || [];
  const niveles = ['Inicial', 'Básico', 'Intermedio', 'Avanzado', 'Experto'];

  return (
    <div className="space-y-6">
      {/* Desglose por nivel */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">📈 Rendimiento por nivel</h3>
        <div className="space-y-2">
          {niveles.map((n) => {
            const d = detallePorNivel[n] || { correctas: 0, total: 5 };
            const pct = Math.round((d.correctas / d.total) * 100);
            const colores = {
              Inicial: 'bg-sky-500',
              Básico: 'bg-emerald-500',
              Intermedio: 'bg-amber-500',
              Avanzado: 'bg-violet-500',
              Experto: 'bg-rose-500',
            };
            return (
              <div key={n} className="flex items-center gap-3">
                <span className="text-slate-400 text-sm w-24 flex-shrink-0">{n}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colores[n]} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-slate-300 text-sm w-16 text-right flex-shrink-0">
                  {d.correctas}/{d.total} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recomendaciones */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">💡 Recomendaciones para mejorar</h3>
        <ul className="space-y-3">
          {recs.map((rec, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold">
                {i + 1}
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">{rec}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
