import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Página de aterrizaje con la sección de inicio y el botón de Ingreso Docente.
 */
export default function Landing() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const features = [
    { emoji: '🎯', title: '15 preguntas', desc: '3 niveles de dificultad, 5 preguntas cada uno' },
    { emoji: '📊', title: 'Resultados inmediatos', desc: 'Conoce tu nivel de habilidad al terminar' },
    { emoji: '💡', title: 'Misiones de Mejora', desc: 'Misiones personalizadas para subir de nivel' },
    { emoji: '☁️', title: 'Guardado en la nube', desc: 'Tus puntuaciones guardadas en la base de datos' },
  ];

  const niveles = [
    { nombre: 'Inicial', emoji: '🌱', color: 'text-sky-400', desc: 'Interfaz básica y fórmulas aritméticas elementales' },
    { nombre: 'Básico', emoji: '📘', color: 'text-emerald-400', desc: 'Referencias absolutas/relativas, funciones de conteo' },
    { nombre: 'Intermedio', emoji: '📊', color: 'text-amber-400', desc: 'BUSCARV, tablas dinámicas, condicionales SI()' },
  ];

  const handleComenzar = () => {
    navigate('/auth');
  };

  const handleDocenteClick = () => {
    setMostrarModal(true);
    setPassword('');
    setErrorPassword('');
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (password === '2228') {
      sessionStorage.setItem('docente_auth', 'true');
      setMostrarModal(false);
      navigate('/docente');
    } else {
      setErrorPassword('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col">
      {/* Botón de Ingreso Docente en la Esquina Superior Derecha */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={handleDocenteClick}
          className="px-4 py-2 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-950 text-slate-400 hover:text-emerald-400 text-xs font-bold rounded-xl transition-all shadow-md"
        >
          🔑 Ingreso Docente
        </button>
      </div>

      {/* Luces de Fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Contenido Principal */}
      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-24 flex-1 flex flex-col justify-center">
        {/* Header / Hero */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">🎓 Test Diagnóstico de Excel</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
            ¿Qué tan bueno eres en{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Excel?
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Realiza nuestro autodiagnóstico de 15 preguntas y descubre tu rango de habilidad.
            Consigue recomendaciones interactivas en tu tarjeta de puntos personal.
          </p>
        </header>

        {/* Botón de Comenzar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            id="btn-comenzar"
            onClick={handleComenzar}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-lg font-black rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5"
          >
            🎮 Iniciar Evaluación
          </button>
          <p className="text-slate-500 text-sm font-semibold">Gratuito · 15 Preguntas · 7 Rangos</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-center hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="text-3xl mb-2">{f.emoji}</div>
              <div className="text-white font-bold text-sm mb-1">{f.title}</div>
              <div className="text-slate-500 text-xs font-medium leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Niveles del Diagnóstico */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-xl font-black text-white text-center mb-6">
            Dificultad Calibrada (3 Niveles)
          </h2>
          <div className="space-y-3">
            {niveles.map((n, i) => (
              <div
                key={n.nombre}
                className="flex items-center gap-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl px-5 py-4 hover:border-slate-700 transition-all hover:translate-x-1"
              >
                <span className="text-2xl">{n.emoji}</span>
                <div className="flex-1">
                  <span className={`font-black uppercase tracking-wider text-sm ${n.color}`}>{n.nombre}</span>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{n.desc}</p>
                </div>
                <span className="text-slate-600 text-[10px] font-black uppercase">Nivel {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-655 text-xs font-bold uppercase tracking-wider">
          <p>ExcelQuest Diagnostic SPA · 2026</p>
        </footer>
      </div>

      {/* Modal de Ingreso Docente */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
              <span>🔐</span> Acceso Docente
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Ingresa la clave de acceso de 4 dígitos para acceder al panel docente.
            </p>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Código de Acceso"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg text-white font-mono tracking-widest focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  autoFocus
                />
              </div>

              {errorPassword && (
                <div className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 border border-rose-500/20 py-2 rounded-xl">
                  {errorPassword}
                </div>
              )}

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 py-3 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-450 hover:text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black rounded-xl text-xs shadow-md transition-all hover:opacity-90"
                >
                  Verificar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
