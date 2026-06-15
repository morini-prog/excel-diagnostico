/**
 * Badge visual que muestra el nivel alcanzado con su color temático.
 * @param {string} nivel - Nombre del nivel alcanzado
 * @param {number} porcentaje - Porcentaje de aciertos (0-100)
 */
export default function LevelBadge({ nivel, porcentaje }) {
  const config = {
    Inicial: {
      emoji: '🌱',
      gradient: 'from-sky-500 to-blue-600',
      glow: 'shadow-sky-500/30',
      text: 'text-sky-300',
      ring: 'ring-sky-500/40',
    },
    Básico: {
      emoji: '📘',
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-300',
      ring: 'ring-emerald-500/40',
    },
    Intermedio: {
      emoji: '📊',
      gradient: 'from-amber-500 to-orange-600',
      glow: 'shadow-amber-500/30',
      text: 'text-amber-300',
      ring: 'ring-amber-500/40',
    },
    Avanzado: {
      emoji: '🚀',
      gradient: 'from-violet-500 to-purple-600',
      glow: 'shadow-violet-500/30',
      text: 'text-violet-300',
      ring: 'ring-violet-500/40',
    },
    Experto: {
      emoji: '🏆',
      gradient: 'from-rose-500 to-pink-600',
      glow: 'shadow-rose-500/30',
      text: 'text-rose-300',
      ring: 'ring-rose-500/40',
    },
  };

  const c = config[nivel] || config.Inicial;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Círculo animado con porcentaje */}
      <div className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${c.gradient} p-1 shadow-2xl ${c.glow} ring-4 ${c.ring}`}>
        <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center">
          <span className="text-4xl mb-1">{c.emoji}</span>
          <span className="text-3xl font-black text-white">{porcentaje}%</span>
        </div>
      </div>

      {/* Etiqueta del nivel */}
      <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${c.gradient} shadow-lg`}>
        <span className="text-white text-lg font-bold tracking-wide">{nivel}</span>
      </div>

      <p className={`text-sm font-medium ${c.text}`}>
        Tu nivel de habilidad en Excel
      </p>
    </div>
  );
}
