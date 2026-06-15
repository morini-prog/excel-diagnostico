import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suscribirResultados, borrarTodosLosResultados } from '../firebase/firestore';
import { formatearFecha } from '../utils/scoring';

/**
 * Panel Docente en Tiempo Real.
 * Permite cambiar vistas (Tabla, Agrupado por Rango, Agrupado por Fecha, Podio Olímpico).
 * Incluye un botón seguro para borrar registros y filtros de búsqueda.
 */
export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [resultados, setResultados] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [rangoSeleccionado, setRangoSeleccionado] = useState('Todos');
  const [cargando, setCargando] = useState(true);
  
  // Control de vista activa: 'tabla' | 'porcentaje' | 'fecha' | 'podio'
  const [vista, setVista] = useState('tabla');

  // Control de modal de borrado
  const [mostrarBorrarModal, setMostrarBorrarModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Verificar autenticación docente
  useEffect(() => {
    const isAuth = sessionStorage.getItem('docente_auth') === 'true';
    if (!isAuth) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Suscribirse a los datos
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

  const handleBorrarTodosClick = () => {
    setMostrarBorrarModal(true);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleConfirmarBorrado = async (e) => {
    e.preventDefault();
    if (deletePassword === '2228') {
      try {
        setDeleteError('');
        await borrarTodosLosResultados();
        // Si no hay error, cerramos el modal con éxito
        setMostrarBorrarModal(false);
      } catch (err) {
        console.error('Error al borrar de Firestore:', err);
        // Informar al usuario que la base de datos remota denegó el borrado (común en reglas seguras de solo lectura/escritura)
        setDeleteError('Se limpió el almacenamiento local, pero la base de datos de Firebase (Firestore) denegó el permiso de borrado.');
      }
    } else {
      setDeleteError('Clave incorrecta. No se pueden borrar los registros.');
    }
  };

  // Filtrar los resultados para la tabla y agrupaciones
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

  // Listado de rangos y colores
  const rangosPosibles = [
    'Experto',
    'Maestro de Fórmulas',
    'Avanzado',
    'Practicante',
    'Aprendiz',
    'Novato',
    'Desconocedor'
  ];

  const coloresRango = {
    Experto: 'from-emerald-500 to-teal-600 border-emerald-500/30 text-emerald-400',
    'Maestro de Fórmulas': 'from-rose-500 to-pink-600 border-rose-500/30 text-rose-400',
    Avanzado: 'from-violet-500 to-fuchsia-600 border-violet-500/30 text-violet-400',
    Practicante: 'from-amber-500 to-yellow-600 border-amber-500/30 text-amber-400',
    Aprendiz: 'from-blue-500 to-indigo-600 border-blue-500/30 text-blue-400',
    Novato: 'from-sky-500 to-sky-700 border-sky-500/30 text-sky-400',
    Desconocedor: 'from-slate-600 to-slate-800 border-slate-700/30 text-slate-400'
  };

  // 1. Agrupamiento por porcentaje (Rango de Categorías)
  const groupedByRank = rangosPosibles.reduce((acc, rango) => {
    const items = resultadosFiltrados.filter((r) => r.nivelAlcanzado === rango);
    if (items.length > 0) {
      acc.push({ rango, items });
    }
    return acc;
  }, []);

  // 2. Agrupamiento por fechas
  const getShortDate = (fechaObj) => {
    if (!fechaObj) return 'Sin fecha';
    const d = fechaObj.toDate ? fechaObj.toDate() : new Date(fechaObj);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const groupedByDate = resultadosFiltrados.reduce((acc, res) => {
    const dateStr = getShortDate(res.fecha);
    const existing = acc.find((g) => g.date === dateStr);
    if (existing) {
      existing.items.push(res);
    } else {
      acc.push({ date: dateStr, items: [res] });
    }
    return acc;
  }, []);

  // 3. Top 5 Leaderboard (Podio Olímpico)
  const topAlumnos = [...resultados]
    .sort((a, b) => {
      if (b.porcentaje !== a.porcentaje) {
        return b.porcentaje - a.porcentaje;
      }
      const dateA = a.fecha?.toDate ? a.fecha.toDate() : new Date(a.fecha || 0);
      const dateB = b.fecha?.toDate ? b.fecha.toDate() : new Date(b.fecha || 0);
      return dateB - dateA;
    })
    .slice(0, 5);

  const plata = topAlumnos[1] || null;
  const oro = topAlumnos[0] || null;
  const bronce = topAlumnos[2] || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ExcelQuest
          </span>
          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] rounded uppercase tracking-wider">
            Docente
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCerrarSesionDocente}
            className="px-4 py-2 bg-slate-900 border border-slate-855 hover:border-slate-700 text-slate-400 hover:text-white font-bold rounded-xl text-xs transition-all"
          >
            Cerrar Sesión Docente
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Encabezado y Estadísticas Rápidas */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Monitoreo en Tiempo Real</h1>
            <p className="text-slate-400 text-sm mt-1">
              Administración y agrupamiento interactivo del desempeño escolar.
            </p>
          </div>

          {/* Tarjetas de Métricas */}
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="flex-1 min-w-[140px] bg-slate-900/60 border border-slate-850 rounded-2xl px-5 py-3 shadow">
              <span className="text-[10px] font-bold text-slate-550 uppercase">Evaluados</span>
              <p className="text-2xl font-black text-white">{totalParticipantes}</p>
            </div>
            <div className="flex-1 min-w-[140px] bg-slate-900/60 border border-slate-850 rounded-2xl px-5 py-3 shadow">
              <span className="text-[10px] font-bold text-slate-550 uppercase">Promedio</span>
              <p className="text-2xl font-black text-emerald-400">{promedioPorcentaje}%</p>
            </div>
          </div>
        </div>

        {/* Panel de Vistas e Instrumentos de Filtrado */}
        <div className="bg-slate-900/60 border border-slate-850 rounded-3xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
          {/* Selector de Vistas (Estilo Arcade) */}
          <div className="flex bg-slate-950 border border-slate-800 rounded-2xl p-1 w-full md:w-auto overflow-x-auto">
            {[
              { id: 'tabla', label: '📋 Tabla' },
              { id: 'porcentaje', label: '📊 Agrupar por %' },
              { id: 'fecha', label: '📅 Agrupar por Fecha' },
              { id: 'podio', label: '🏆 Podio Top 5' }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setVista(v.id)}
                className={`flex-1 md:flex-none py-2.5 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  vista === v.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Controles de Acción Lateral */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleBorrarTodosClick}
              className="w-full md:w-auto px-4 py-2.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2"
            >
              🗑️ Limpiar Registros
            </button>
          </div>
        </div>

        {/* Buscador de Texto */}
        {vista !== 'podio' && (
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/40 border border-slate-855 rounded-2xl p-4">
            <input
              type="text"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              placeholder="Buscar alumno por nombre, apellido o email..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <select
              value={rangoSeleccionado}
              onChange={(e) => setRangoSeleccionado(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Todos">Todos los Rangos</option>
              {rangosPosibles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Renderizado Condicional de la Vista */}
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
            <p className="text-slate-500 text-sm font-semibold">Cargando base de datos...</p>
          </div>
        ) : (
          <>
            {/* VISTA 1: TABLA GENERAL */}
            {vista === 'tabla' && (
              <div className="bg-slate-900/60 border border-slate-850 rounded-[32px] p-6 shadow-xl">
                {resultadosFiltrados.length === 0 ? (
                  <p className="text-slate-500 text-center py-10 text-sm">No se encontraron resultados.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500">
                          <th className="text-left font-bold pb-4 uppercase text-xs">Alumno</th>
                          <th className="text-left font-bold pb-4 uppercase text-xs">Email</th>
                          <th className="text-left font-bold pb-4 uppercase text-xs">Fecha / Hora</th>
                          <th className="text-center font-bold pb-4 uppercase text-xs">Aciertos</th>
                          <th className="text-center font-bold pb-4 uppercase text-xs">Porcentaje</th>
                          <th className="text-right font-bold pb-4 uppercase text-xs">Rango Logrado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850/50">
                        {resultadosFiltrados.map((res) => (
                          <tr key={res.id} className="hover:bg-slate-850/10 transition-colors">
                            <td className="py-4 text-white font-bold">{res.nombre} {res.apellido}</td>
                            <td className="py-4 text-slate-400">{res.email}</td>
                            <td className="py-4 text-slate-400 font-medium">{formatearFecha(res.fecha)}</td>
                            <td className="py-4 text-center text-slate-350 font-bold">{res.puntaje} / 15</td>
                            <td className="py-4 text-center text-emerald-450 font-black">{res.porcentaje}%</td>
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
            )}

            {/* VISTA 2: AGRUPAR POR PORCENTAJES (RANGOS) */}
            {vista === 'porcentaje' && (
              <div className="space-y-6">
                {groupedByRank.length === 0 ? (
                  <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-8 text-center text-slate-500">
                    No hay registros con los filtros indicados.
                  </div>
                ) : (
                  groupedByRank.map((group) => (
                    <div key={group.rango} className="bg-slate-900/60 border border-slate-850 rounded-[24px] p-6 space-y-4 shadow-xl">
                      {/* Cabecera del Rango */}
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 bg-gradient-to-r ${coloresRango[group.rango]} text-white text-xs font-black uppercase rounded-lg shadow-sm`}>
                            {group.rango}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-bold">
                          {group.items.length} {group.items.length === 1 ? 'alumno' : 'alumnos'}
                        </span>
                      </div>
                      
                      {/* Grid de Alumnos en este Rango */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {group.items.map((res) => (
                          <div key={res.id} className="bg-slate-950/60 border border-slate-850 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-start">
                              <h4 className="text-white font-bold text-sm truncate">{res.nombre} {res.apellido}</h4>
                              <span className="text-emerald-400 font-black text-sm">{res.porcentaje}%</span>
                            </div>
                            <p className="text-slate-500 text-xs truncate">{res.email}</p>
                            <p className="text-[10px] text-slate-550 font-medium">{formatearFecha(res.fecha)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* VISTA 3: AGRUPAR POR FECHA */}
            {vista === 'fecha' && (
              <div className="space-y-6">
                {groupedByDate.length === 0 ? (
                  <div className="bg-slate-900/60 border border-slate-850 rounded-2xl p-8 text-center text-slate-500">
                    No hay registros con los filtros indicados.
                  </div>
                ) : (
                  groupedByDate.map((group) => (
                    <div key={group.date} className="bg-slate-900/60 border border-slate-850 rounded-[24px] p-6 space-y-4 shadow-xl">
                      {/* Cabecera de Fecha */}
                      <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                        <span className="text-white font-black text-sm flex items-center gap-2">
                          <span>📅</span> {group.date}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">
                          {group.items.length} {group.items.length === 1 ? 'evaluación' : 'evaluaciones'}
                        </span>
                      </div>
                      
                      {/* Lista de Alumnos Evaluados en esta Fecha */}
                      <div className="space-y-2">
                        {group.items.map((res) => (
                          <div key={res.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950/60 border border-slate-850 hover:border-slate-800 rounded-2xl transition-all gap-2">
                            <div>
                              <p className="text-sm font-bold text-white">{res.nombre} {res.apellido}</p>
                              <p className="text-xs text-slate-550 mt-0.5">{res.email}</p>
                            </div>
                            <div className="flex items-center gap-4 justify-between sm:justify-end">
                              <span className="text-xs text-slate-400">
                                {res.puntaje}/15 aciertos
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-emerald-400 font-black text-sm">{res.porcentaje}%</span>
                                <span className="px-2.5 py-0.5 bg-slate-800 text-[9px] font-bold text-slate-350 uppercase tracking-wider rounded border border-slate-750">
                                  {res.nivelAlcanzado}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* VISTA 4: PODIO OLÍMPICO (TOP 5) */}
            {vista === 'podio' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                    🏆 Líderes del Podio Olímpico
                  </h2>
                  <p className="text-slate-450 text-xs mt-1">
                    Ranking de los mejores 5 desempeños históricos de la evaluación
                  </p>
                </div>

                {/* Contenedor del Podio 3D */}
                {resultados.length === 0 ? (
                  <p className="text-slate-500 text-center py-12">No hay datos suficientes para armar el podio.</p>
                ) : (
                  <div className="space-y-10">
                    <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-2 max-w-2xl mx-auto pt-10">
                      
                      {/* Plata - 2° Lugar (Izquierda) */}
                      <div className="w-full sm:w-44 flex flex-col items-center">
                        {plata ? (
                          <div className="text-center space-y-2 mb-3 animate-fadeIn">
                            <span className="text-3xl">🥈</span>
                            <h4 className="text-sm font-bold text-white max-w-[130px] truncate mx-auto">{plata.nombre}</h4>
                            <p className="text-xs text-slate-400 font-bold">{plata.porcentaje}%</p>
                            <p className="text-[9px] text-slate-550">{getShortDate(plata.fecha)}</p>
                          </div>
                        ) : (
                          <div className="text-center mb-3 text-slate-600 text-xs italic">Vacío</div>
                        )}
                        {/* Pedestal */}
                        <div className="w-full h-28 bg-gradient-to-t from-slate-800 to-slate-600 border border-slate-500/30 rounded-t-2xl shadow-lg shadow-slate-600/5 flex items-center justify-center select-none">
                          <span className="text-4xl font-black text-slate-200 opacity-60">2</span>
                        </div>
                      </div>

                      {/* Oro - 1° Lugar (Centro - Más Alto) */}
                      <div className="w-full sm:w-48 flex flex-col items-center z-10 order-first sm:order-none">
                        {oro ? (
                          <div className="text-center space-y-2 mb-3 animate-fadeIn">
                            <span className="text-4xl block animate-bounce">👑</span>
                            <h4 className="text-base font-black text-white max-w-[150px] truncate mx-auto">{oro.nombre}</h4>
                            <p className="text-sm font-black text-yellow-400">{oro.porcentaje}%</p>
                            <p className="text-[9px] text-slate-550 font-medium">{getShortDate(oro.fecha)}</p>
                          </div>
                        ) : (
                          <div className="text-center mb-3 text-slate-600 text-xs italic">Vacío</div>
                        )}
                        {/* Pedestal */}
                        <div className="w-full h-40 bg-gradient-to-t from-yellow-750 to-yellow-500 border border-yellow-500/30 rounded-t-2xl shadow-xl shadow-yellow-500/10 flex items-center justify-center select-none relative overflow-hidden">
                          <div className="absolute inset-0 bg-yellow-500/5 animate-pulse" />
                          <span className="text-5xl font-black text-yellow-100 opacity-70 relative z-10">1</span>
                        </div>
                      </div>

                      {/* Bronce - 3° Lugar (Derecha) */}
                      <div className="w-full sm:w-44 flex flex-col items-center">
                        {bronce ? (
                          <div className="text-center space-y-2 mb-3 animate-fadeIn">
                            <span className="text-3xl">🥉</span>
                            <h4 className="text-sm font-bold text-white max-w-[130px] truncate mx-auto">{bronce.nombre}</h4>
                            <p className="text-xs text-slate-400 font-bold">{bronce.porcentaje}%</p>
                            <p className="text-[9px] text-slate-550">{getShortDate(bronce.fecha)}</p>
                          </div>
                        ) : (
                          <div className="text-center mb-3 text-slate-600 text-xs italic">Vacío</div>
                        )}
                        {/* Pedestal */}
                        <div className="w-full h-20 bg-gradient-to-t from-amber-800 to-amber-700 border border-amber-800/30 rounded-t-2xl shadow-lg shadow-amber-800/5 flex items-center justify-center select-none">
                          <span className="text-3xl font-black text-amber-250 opacity-60">3</span>
                        </div>
                      </div>

                    </div>

                    {/* Menciones de Honor (4° y 5° Lugar) */}
                    {(topAlumnos[3] || topAlumnos[4]) && (
                      <div className="max-w-md mx-auto space-y-2.5">
                        <h4 className="text-center text-slate-500 text-[10px] font-black uppercase tracking-wider">
                          Menciones de Honor
                        </h4>
                        
                        {topAlumnos.slice(3, 5).map((res, i) => (
                          <div
                            key={res.id}
                            className="flex items-center justify-between p-4 bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-2xl shadow transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-850">
                                {i + 4}
                              </span>
                              <div>
                                <p className="text-sm font-bold text-white">{res.nombre} {res.apellido}</p>
                                <p className="text-[10px] text-slate-550 mt-0.5">{res.email}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-emerald-400 font-black text-sm">{res.porcentaje}%</span>
                              <p className="text-[9px] text-slate-550">{getShortDate(res.fecha)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal de Confirmación de Borrado */}
      {mostrarBorrarModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
              <span>⚠️</span> ¿Borrar todos los registros?
            </h3>
            <p className="text-slate-450 text-xs mb-4">
              Esta acción es irreversible y eliminará todos los registros históricos de los alumnos de la base de datos.
            </p>

            <form onSubmit={handleConfirmarBorrado} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Clave Docente de Confirmación"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-lg text-white font-mono tracking-widest focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  autoFocus
                />
              </div>

              {deleteError && (
                <div className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 border border-rose-500/20 py-2.5 rounded-xl">
                  {deleteError}
                </div>
              )}

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setMostrarBorrarModal(false)}
                  className="flex-1 py-3 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs shadow-md transition-all"
                >
                  Confirmar Borrado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
