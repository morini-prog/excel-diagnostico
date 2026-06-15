import { useNavigate } from 'react-router-dom';

/**
 * Página de aterrizaje con hero section y llamada a la acción.
 */
export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { emoji: '🎯', title: '25 preguntas', desc: '5 niveles de dificultad, 5 preguntas cada uno' },
    { emoji: '📊', title: 'Resultados inmediatos', desc: 'Conocé tu nivel exacto al terminar' },
    { emoji: '💡', title: 'Recomendaciones', desc: 'Consejos personalizados para mejorar' },
    { emoji: '☁️', title: 'Guardado en la nube', desc: 'Tu historial siempre disponible' },
  ];

  const niveles = [
    { nombre: 'Inicial', emoji: '🌱', color: 'text-sky-400', desc: 'Interfaz básica y fórmulas simples' },
    { nombre: 'Básico', emoji: '📘', color: 'text-emerald-400', desc: 'Referencias, funciones de conteo' },
    { nombre: 'Intermedio', emoji: '📊', color: 'text-amber-400', desc: 'BUSCARV, tablas dinámicas, SI()' },
    { nombre: 'Avanzado', emoji: '🚀', color: 'text-violet-400', desc: 'Macros, Power Query, Solver' },
    { nombre: 'Experto', emoji: '🏆', color: 'text-rose-400', desc: 'VBA, DAX, fórmulas dinámicas 365' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24">
        {/* Logo / Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-emerald-400 text-sm font-medium">🎓 Diagnóstico gratuito</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4">
            ¿Cuánto sabés de{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Excel?
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Realizá nuestro diagnóstico de 25 preguntas y descubrí tu nivel real de competencia en Excel.
            Obtené recomendaciones personalizadas para seguir creciendo.
          </p>
        </header>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            id="btn-comenzar"
            onClick={() => navigate('/auth')}
            className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
          >
            🚀 Comenzar diagnóstico
          </button>
          <p className="text-slate-500 text-sm">Sin costo · 10 minutos · Resultados inmediatos</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 text-center hover:border-slate-600 transition-colors"
            >
              <div className="text-3xl mb-2">{f.emoji}</div>
              <div className="text-white font-semibold text-sm mb-1">{f.title}</div>
              <div className="text-slate-500 text-xs">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Niveles */}
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Los 5 niveles del diagnóstico
          </h2>
          <div className="space-y-3">
            {niveles.map((n, i) => (
              <div
                key={n.nombre}
                className="flex items-center gap-4 bg-slate-800/40 border border-slate-700/50 rounded-xl px-5 py-4 hover:border-slate-600 transition-all hover:translate-x-1"
              >
                <span className="text-2xl">{n.emoji}</span>
                <div className="flex-1">
                  <span className={`font-bold ${n.color}`}>{n.nombre}</span>
                  <span className="text-slate-500 ml-3 text-sm">{n.desc}</span>
                </div>
                <span className="text-slate-600 text-xs">Nivel {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 text-slate-600 text-sm">
          <p>Diagnóstico de Habilidades Excel · Desarrollado con ❤️ en Argentina</p>
        </footer>
      </div>
    </div>
  );
}
