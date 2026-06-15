import { recomendaciones } from '../../data/questions';

/**
 * Muestra las recomendaciones de mejora según el nivel alcanzado y el desglose de rendimiento.
 * @param {string} nivel - Nivel/Rango alcanzado por el estudiante
 * @param {object} detallePorNivel - { Inicial: { correctas, total }, ... }
 */
export default function Recommendations({ nivel, detallePorNivel }) {
  const niveles = ['Inicial', 'Básico', 'Intermedio'];

  // Obtener misiones basadas en los niveles que no tienen puntaje perfecto
  const misionesActivas = [];
  const misionesCompletadas = [];

  niveles.forEach((n) => {
    const d = detallePorNivel[n] || { correctas: 0, total: 5 };
    const recs = recomendaciones[n] || [];

    if (d.correctas < d.total) {
      // Si no fue perfecto, se añaden las recomendaciones como misiones activas
      recs.forEach((rec, idx) => {
        misionesActivas.push({
          nivel: n,
          texto: rec,
          id: `${n}-rec-${idx}`
        });
      });
    } else {
      // Si es perfecto, esa categoría de misiones ya está completada
      misionesCompletadas.push({
        nivel: n,
        texto: `¡Has completado todas las misiones del nivel ${n}! Dominas las habilidades evaluadas.`
      });
    }
  });

  return (
    <div className="space-y-8">
      {/* Desglose por Nivel */}
      <div>
        <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
          <span>📈</span> Rendimiento por Categoría
        </h3>
        <div className="space-y-4">
          {niveles.map((n) => {
            const d = detallePorNivel[n] || { correctas: 0, total: 5 };
            const pct = Math.round((d.correctas / d.total) * 100);
            
            const colores = {
              Inicial: 'from-sky-500 to-blue-600',
              Básico: 'from-emerald-500 to-teal-600',
              Intermedio: 'from-amber-500 to-orange-600',
            };

            return (
              <div key={n} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-white uppercase tracking-wider text-xs">{n}</span>
                  <span className="text-slate-400 font-bold text-xs">
                    {d.correctas} / {d.total} aciertos ({pct}%)
                  </span>
                </div>
                <div className="h-3 bg-slate-850 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colores[n]} transition-all duration-750`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Misiones para Subir de Nivel */}
      <div>
        <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
          <span>⚔️</span> Misiones para Subir de Nivel
        </h3>
        
        <div className="space-y-3">
          {/* Misiones Activas (Pendientes) */}
          {misionesActivas.length > 0 ? (
            misionesActivas.map((mision, i) => (
              <div
                key={mision.id}
                className="flex items-start gap-4 bg-slate-900/60 border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-4 transition-all animate-fadeIn"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {/* Checkbox vacío interactivo */}
                  <div className="w-5 h-5 rounded border-2 border-amber-500/60 flex items-center justify-center text-amber-500 bg-slate-900 font-bold text-[10px]">
                    ☐
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded">
                    Misión {mision.nivel}
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed">{mision.texto}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center text-emerald-400">
              🎉 ¡Felicidades! Has completado todas las misiones posibles. ¡Eres un maestro indiscutido de Excel!
            </div>
          )}

          {/* Misiones Completadas */}
          {misionesCompletadas.map((mision, i) => (
            <div
              key={`comp-${i}`}
              className="flex items-start gap-4 bg-slate-900/25 border border-emerald-500/10 opacity-70 rounded-2xl p-4 transition-all"
            >
              <div className="flex-shrink-0 mt-0.5">
                {/* Checkbox marcado */}
                <div className="w-5 h-5 rounded border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 bg-emerald-500/15 font-bold text-[10px]">
                  ✓
                </div>
              </div>
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                  {mision.nivel} Completado
                </span>
                <p className="text-slate-400 text-sm leading-relaxed">{mision.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
