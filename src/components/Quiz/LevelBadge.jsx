/**
 * Badge visual que muestra el rango alcanzado con estilo de juego de rol (RPG).
 * @param {string} nivel - Nombre del rango o nivel alcanzado
 * @param {number} porcentaje - Porcentaje de aciertos (0-100)
 */
export default function LevelBadge({ nivel, porcentaje }) {
  const config = {
    Desconocedor: {
      emoji: '🥚',
      badge: 'Rango 1: Desconocedor',
      gradient: 'from-slate-600 to-slate-800',
      glow: 'shadow-slate-500/20',
      text: 'text-slate-400',
      ring: 'ring-slate-500/35',
    },
    Novato: {
      emoji: '🌱',
      badge: 'Rango 2: Novato',
      gradient: 'from-sky-500 to-sky-700',
      glow: 'shadow-sky-500/25',
      text: 'text-sky-400',
      ring: 'ring-sky-500/35',
    },
    Aprendiz: {
      emoji: '🛡️',
      badge: 'Rango 3: Aprendiz',
      gradient: 'from-blue-500 to-indigo-600',
      glow: 'shadow-blue-500/25',
      text: 'text-blue-400',
      ring: 'ring-blue-500/35',
    },
    Practicante: {
      emoji: '⚙️',
      badge: 'Rango 4: Practicante',
      gradient: 'from-amber-500 to-yellow-600',
      glow: 'shadow-amber-500/25',
      text: 'text-amber-400',
      ring: 'ring-amber-500/35',
    },
    Avanzado: {
      emoji: '⚡',
      badge: 'Rango 5: Avanzado',
      gradient: 'from-violet-500 to-fuchsia-600',
      glow: 'shadow-violet-500/25',
      text: 'text-violet-400',
      ring: 'ring-violet-500/35',
    },
    'Maestro de Fórmulas': {
      emoji: '🔮',
      badge: 'Rango 6: Maestro de Fórmulas',
      gradient: 'from-rose-500 to-pink-600',
      glow: 'shadow-rose-500/25',
      text: 'text-rose-400',
      ring: 'ring-rose-500/35',
    },
    Experto: {
      emoji: '👑',
      badge: 'Rango 7: Experto de Excel',
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-400',
      ring: 'ring-emerald-500/40',
    },
  };

  const c = config[nivel] || config.Desconocedor;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Círculo animado con porcentaje */}
      <div className={`relative w-44 h-44 rounded-full bg-gradient-to-br ${c.gradient} p-1 shadow-2xl ${c.glow} ring-4 ${c.ring} transform transition-transform hover:scale-105 duration-300`}>
        <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Fondo decorativo interno */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 to-transparent pointer-events-none" />
          <span className="text-5xl mb-2 z-10">{c.emoji}</span>
          <span className="text-4xl font-black text-white tracking-tight z-10">{porcentaje}%</span>
        </div>
      </div>

      {/* Etiqueta del rango */}
      <div className={`px-6 py-2.5 rounded-2xl bg-gradient-to-r ${c.gradient} shadow-lg shadow-black/40`}>
        <span className="text-white text-base font-black tracking-wider uppercase">{c.badge}</span>
      </div>

      <p className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>
        Rango de Habilidad Obtenido
      </p>
    </div>
  );
}
