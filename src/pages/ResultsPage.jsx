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
 * Pantalla de resultados detallada con:
 * - Nivel alcanzado y porcentaje
 * - Desglose de respuestas correctas e incorrectas
 * - Recomendaciones específicas
 * - Historial de intentos anteriores
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800/60">
        <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          ExcelDiagnóstico
        </span>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm hidden sm:block">
            {nombre} {apellido}
          </span>
          <button
            id="btn-cerrar-sesion"
            onClick={handleCerrarSesion}
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Título */}
        <div className="text-center">
          <p className="text-emerald-400 text-sm font-medium mb-2">¡Diagnóstico completado!</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Tus resultados, {nombre || 'estudiante'}
          </h1>
          <p className="text-slate-400 text-sm">{email}</p>
        </div>

        {/* Badge de nivel + resumen */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl">
          <LevelBadge nivel={resultado.nivel} porcentaje={resultado.porcentaje} />

          <div className="w-full grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">{resultado.correctas}</div>
              <div className="text-slate-500 text-xs mt-1">Correctas</div>
            </div>
            <div className="text-center border-x border-slate-700">
              <div className="text-3xl font-black text-rose-400">{resultado.incorrectas}</div>
              <div className="text-slate-500 text-xs mt-1">Incorrectas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">{preguntas.length}</div>
              <div className="text-slate-500 text-xs mt-1">Total</div>
            </div>
          </div>
        </div>

        {/* Respuestas incorrectas */}
        {resultado.indicesIncorrectos.length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white">❌ Preguntas con respuesta incorrecta</h2>
            <div className="space-y-3">
              {resultado.indicesIncorrectos.map((idx) => {
                const p = preguntas[idx];
                return (
                  <div key={idx} className="bg-slate-900/60 border border-red-500/20 rounded-xl p-4">
                    <p className="text-slate-300 text-sm font-medium mb-2">
                      {idx + 1}. {p.pregunta}
                    </p>
                    <p className="text-emerald-400 text-sm">
                      ✓ Respuesta correcta: <strong>{p.opciones[p.correcta]}</strong>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 shadow-xl">
          <Recommendations
            nivel={resultado.nivel}
            detallePorNivel={resultado.detallePorNivel}
          />
        </div>

        {/* Historial */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">📋 Historial de intentos</h2>
          {cargandoHistorial ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
            </div>
          ) : historial.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">
              Este es tu primer diagnóstico. ¡Buen comienzo!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 font-medium pb-3 pr-4">Fecha</th>
                    <th className="text-left text-slate-400 font-medium pb-3 pr-4">Nivel</th>
                    <th className="text-left text-slate-400 font-medium pb-3 pr-4">Puntaje</th>
                    <th className="text-left text-slate-400 font-medium pb-3">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {historial.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="py-3 pr-4 text-slate-400">{formatearFecha(h.fecha)}</td>
                      <td className="py-3 pr-4 text-white font-medium">{h.nivelAlcanzado}</td>
                      <td className="py-3 pr-4 text-slate-300">{h.puntaje}/25</td>
                      <td className="py-3 text-emerald-400 font-semibold">{h.porcentaje}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 pb-10">
          <button
            id="btn-nuevo-diagnostico"
            onClick={handleNuevoDiagnostico}
            className="btn-primary flex-1 py-4 text-base"
          >
            🔄 Realizar otro diagnóstico
          </button>
          <button
            onClick={handleCerrarSesion}
            className="flex-1 py-4 text-base rounded-2xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
