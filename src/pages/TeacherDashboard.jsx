import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suscribirResultados } from '../firebase/firestore';
import { formatearFecha } from '../utils/scoring';

/**
 * Panel Docente en Tiempo Real.
 * Protegido por contraseña (verifica sesión en sessionStorage).
 * Muestra el listado de participantes y estadísticas clave de rendimiento.
 */
export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [resultados, setResultados] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [rangoSeleccionado, setRangoSeleccionado] = useState('Todos');
  const [cargando, setCargando] = useState(true);

  // Verificar autenticación docente
  useEffect(() => {
    const isAuth = sessionStorage.getItem('docente_auth') === 'true';
    if (!isAuth) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Suscribirse a los datos en tiempo real
  useEffect(() => {
    setCargando(true);
    const desuscribir = suscribirResultados((datos) => {
      setResultados(datos);
      setCargando(false);
    });
    return () => desuscribir();
  }, []);

  const handleCerrarSesionDocente = () => {
    sessionStorage.removeItem('docente_auth');
    navigate('/');
  };

  // Filtrar los resultados
  const resultadosFiltrados = resultados.filter((r) => {
    const coincidenciaTexto =
      r.nombre?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      r.apellido?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      r.email?.toLowerCase().includes(filtroTexto.toLowerCase());

    const coincidenciaRango =
      rangoSeleccionado === 'Todos' || r.nivelAlcanzado === rangoSeleccionado;

    return coincidenciaTexto && coincidenciaRango;
  });

  // Estadísticas globales
  const totalParticipantes = resultados.length;
  const promedioPorcentaje =
    totalParticipantes > 0
      ? Math.round(resultados.reduce((acc, r) => acc + (r.porcentaje || 0), 0) / totalParticipantes)
      : 0;

  const conteoRangos = resultados.reduce((acc, r) => {
    const rango = r.nivelAlcanzado || 'Desconocedor';
    acc[rango] = (acc[rango] || 0) + 1;
    return acc;
  }, {});

  const rangosPosibles = [
    'Desconocedor',
    'Novato',
    'Aprendiz',
    'Practicante',
    'Avanzado',
    'Maestro de Fórmulas',
    'Experto'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ExcelQuest
          </span>
          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] rounded uppercase tracking-wider">
            Panel Docente
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCerrarSesionDocente}
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-bold rounded-xl text-sm transition-all"
          >
            Cerrar Sesión Docente
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Dashboard Grid Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Monitoreo en Tiempo Real</h1>
            <p className="text-slate-400 text-sm mt-1">
              Visualiza el progreso de tus alumnos y los resultados de sus evaluaciones.
            </p>
          </div>
        </div>

        {/* Resumen de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Alumnos Evaluados</p>
            <p className="text-4xl font-black text-white mt-2">{totalParticipantes}</p>
            <div className="absolute top-4 right-4 text-2xl opacity-20">👥</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Promedio General</p>
            <p className="text-4xl font-black text-emerald-400 mt-2">{promedioPorcentaje}%</p>
            <div className="absolute top-4 right-4 text-2xl opacity-20">📈</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Rango más frecuente</p>
            <p className="text-xl font-black text-white mt-4 truncate">
              {Object.keys(conteoRangos).length > 0
                ? Object.keys(conteoRangos).reduce((a, b) => (conteoRangos[a] > conteoRangos[b] ? a : b))
                : 'Ninguno'}
            </p>
            <div className="absolute top-4 right-4 text-2xl opacity-20">🏆</div>
          </div>
        </div>

        {/* Distribución de Rangos (Gráfico de Barras Simple) */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider mb-5">Distribución de Rangos Logrados</h2>
          <div className="space-y-3">
            {rangosPosibles.map((rango) => {
              const count = conteoRangos[rango] || 0;
              const pct = totalParticipantes > 0 ? Math.round((count / totalParticipantes) * 100) : 0;
              return (
                <div key={rango} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-36 flex-shrink-0 font-medium">{rango}</span>
                  <div className="flex-1 h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-300 w-16 text-right font-bold">
                    {count} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filtros e Historial */}
        <div className="bg-slate-900/60 border border-slate-850 rounded-[32px] p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <h2 className="text-lg font-black text-white">Detalle de Alumnos</h2>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Buscador */}
              <input
                type="text"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                placeholder="Buscar por nombre o email..."
                className="w-full sm:w-60 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              {/* Selector de Rango */}
              <select
                value={rangoSeleccionado}
                onChange={(e) => setRangoSeleccionado(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="Todos">Todos los Rangos</option>
                {rangosPosibles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabla de Alumnos */}
          {cargando ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
              <p className="text-slate-500 text-sm font-semibold">Conectando con base de datos en tiempo real...</p>
            </div>
          ) : resultadosFiltrados.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No se encontraron registros que coincidan con los filtros seleccionados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="text-left font-bold pb-4 uppercase text-xs">Alumno</th>
                    <th className="text-left font-bold pb-4 uppercase text-xs">Email</th>
                    <th className="text-left font-bold pb-4 uppercase text-xs">Fecha / Hora</th>
                    <th className="text-center font-bold pb-4 uppercase text-xs">Aciertos</th>
                    <th className="text-center font-bold pb-4 uppercase text-xs">Porcentaje</th>
                    <th className="text-right font-bold pb-4 uppercase text-xs">Rango Logrado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {resultadosFiltrados.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-800/10 transition-colors">
                      <td className="py-4 text-white font-bold">
                        {res.nombre} {res.apellido}
                      </td>
                      <td className="py-4 text-slate-400">{res.email}</td>
                      <td className="py-4 text-slate-400 font-medium">
                        {formatearFecha(res.fecha)}
                      </td>
                      <td className="py-4 text-center text-slate-300 font-bold">{res.puntaje} / 15</td>
                      <td className="py-4 text-center text-emerald-400 font-black">{res.porcentaje}%</td>
                      <td className="py-4 text-right">
                        <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                          {res.nivelAlcanzado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
