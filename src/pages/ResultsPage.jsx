import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cerrarSesion } from '../firebase/auth';
import { obtenerResultadosPorUsuario } from '../firebase/firestore';
import LevelBadge from '../components/Quiz/LevelBadge';
import Recommendations from '../components/Results/Recommendations';
import { preguntas } from '../data/questions';
import { formatearFecha } from '../utils/scoring';

/**
 * Pantalla de resultados estilizada como "Gaming Scorecard" (Tarjeta de Puntos).
 * Incluye un efecto de confeti basado en Canvas nativo, desglose de estadísticas
 * y lista de misiones para subir de nivel.
 */
export default function ResultsPage() {
  const { usuario, cargando } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);

  const resultado = location.state?.resultado;
  const nombre = location.state?.nombre || '';
  const apellido = location.state?.apellido || '';
  const email = location.state?.email || '';

  // Trigger Confetti Effect on mount
  useEffect(() => {
    if (!resultado) return;

    // Solo tirar confeti si tiene un porcentaje aceptable (>35% o excelente)
    // Pero como es un juego, tiramos confeti siempre al finalizar, ¡haciéndolo festivo!
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrame;
    
    // Ajustar tamaño del canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];
    const confettiCount = 120;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.05 + 0.02,
        tiltAngle: 0
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      confetti.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2.5; // velocidad vertical
        p.x += Math.sin(p.tiltAngle) * 1.5;         // oscilación horizontal
        p.tilt = Math.sin(p.tiltAngle - index / 3) * 12;

        if (p.y <= canvas.height) {
          active = true;
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      if (active) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    // Dar un leve retraso para que cargue la vista
    const timeout = setTimeout(draw, 300);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [resultado]);

  useEffect(() => {
    if (usuario) {
      setCargandoHistorial(true);
      obtenerResultadosPorUsuario(usuario.uid)
        .then(setHistorial)
        .catch(console.error)
        .finally(() => setCargandoHistorial(false));
    }
  }, [usuario]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!usuario) return <Navigate to="/auth" replace />;
  if (!resultado) return <Navigate to="/" replace />;

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    navigate('/');
  };

  const handleNuevoDiagnostico = () => navigate('/quiz');

  const fechaDeHoy = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-x-hidden">
      {/* Canvas de Confeti */}
      <canvas id="confetti-canvas" className="absolute inset-0 w-full h-full pointer-events-none z-50" />

      {/* Luces de fondo arcade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800/60 bg-slate-950/60 backdrop-blur-md z-40">
        <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          ExcelQuest
        </span>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm hidden sm:block font-bold">
            {nombre} {apellido}
          </span>
          <button
            id="btn-cerrar-sesion"
            onClick={handleCerrarSesion}
            className="text-slate-500 hover:text-rose-400 text-sm font-bold transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="relative max-w-3xl mx-auto px-4 py-10 space-y-8 z-40">
        
        {/* Título de Felicitaciones */}
        <div className="text-center">
          <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1.5 animate-pulse">
            ★ ¡Diagnóstico Finalizado con Éxito! ★
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Tu Tarjeta de Puntos
          </h1>
          <p className="text-slate-500 text-sm mt-1">{email}</p>
        </div>

        {/* Tarjeta de Puntos Arcade (Gaming Scorecard) */}
        <div className="relative bg-slate-900/80 border border-emerald-500/30 rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-emerald-500/5 overflow-hidden">
          {/* Luz lateral de la tarjeta */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />

          {/* Sello de Fecha y Título Interno */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-slate-800 text-slate-400 rounded-lg">
              Scorecard de Habilidades
            </span>
            <span className="text-xs text-slate-500 font-bold">{fechaDeHoy}</span>
          </div>

          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {/* Jugador Nombre */}
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center">
              {nombre} {apellido}
            </h2>

            {/* Badge Principal del Nivel */}
            <LevelBadge nivel={resultado.nivel} porcentaje={resultado.porcentaje} />

            {/* Estadísticas de Aciertos en Grilla */}
            <div className="w-full grid grid-cols-3 gap-3 pt-6 border-t border-slate-800">
              <div className="text-center bg-slate-950/40 border border-slate-800/80 rounded-2xl py-3.5">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {resultado.correctas}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Correctas
                </div>
              </div>
              <div className="text-center bg-slate-950/40 border border-slate-800/80 rounded-2xl py-3.5">
                <div className="text-2xl sm:text-3xl font-black text-rose-500">
                  {resultado.incorrectas}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Incorrectas
                </div>
              </div>
              <div className="text-center bg-slate-950/40 border border-slate-800/80 rounded-2xl py-3.5">
                <div className="text-2xl sm:text-3xl font-black text-slate-300">
                  {preguntas.length}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Total
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desglose de Preguntas con Respuesta Incorrecta */}
        {resultado.indicesIncorrectos.length > 0 && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <span>❌</span> Preguntas a mejorar
            </h2>
            <div className="space-y-3">
              {resultado.indicesIncorrectos.map((idx) => {
                const p = preguntas[idx];
                return (
                  <div key={idx} className="bg-slate-950/50 border border-red-500/10 rounded-2xl p-4">
                    <p className="text-slate-300 text-sm font-bold mb-2">
                      {idx + 1}. {p.pregunta}
                    </p>
                    <p className="text-emerald-400 text-xs font-semibold">
                      ✓ Respuesta correcta: <span className="font-bold">{p.opciones[p.correcta]}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recomendaciones (Quests to Level Up) */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-[32px] p-6 sm:p-8 shadow-xl">
          <Recommendations
            nivel={resultado.nivel}
            detallePorNivel={resultado.detallePorNivel}
          />
        </div>

        {/* Historial de Intentos */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-[32px] p-6 sm:p-8 shadow-xl">
          <h2 className="text-base font-black text-white mb-4 flex items-center gap-2">
            <span>📋</span> Historial de Intentos
          </h2>
          {cargandoHistorial ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
            </div>
          ) : historial.length <= 1 ? (
            <p className="text-slate-500 text-sm text-center py-4">
              Este es tu primer intento. ¡Excelente comienzo en ExcelQuest! 🚀
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-slate-500 font-bold pb-3 pr-4 uppercase text-xs">Fecha</th>
                    <th className="text-left text-slate-500 font-bold pb-3 pr-4 uppercase text-xs">Nivel</th>
                    <th className="text-left text-slate-500 font-bold pb-3 pr-4 uppercase text-xs">Aciertos</th>
                    <th className="text-left text-slate-500 font-bold pb-3 uppercase text-xs text-right">Porcentaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {historial.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3.5 pr-4 text-slate-400 font-medium">{formatearFecha(h.fecha)}</td>
                      <td className="py-3.5 pr-4 text-white font-bold">{h.nivelAlcanzado}</td>
                      <td className="py-3.5 pr-4 text-slate-300 font-bold">{h.puntaje} / 15</td>
                      <td className="py-3.5 text-emerald-400 font-black text-right">{h.porcentaje}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Acciones del Jugador */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-12">
          <button
            id="btn-nuevo-diagnostico"
            onClick={handleNuevoDiagnostico}
            className="w-full sm:flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base"
          >
            🔄 Repetir Diagnóstico
          </button>
          <button
            onClick={handleCerrarSesion}
            className="w-full sm:flex-1 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-bold rounded-2xl transition-all"
          >
            Finalizar Sesión
          </button>
        </div>
      </main>
    </div>
  );
}
