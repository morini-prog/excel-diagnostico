import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { preguntas } from '../data/questions';
import QuizQuestion from '../components/Quiz/QuizQuestion';
import ProgressBar from '../components/Quiz/ProgressBar';
import { calcularPuntaje } from '../utils/scoring';
import { guardarResultado } from '../firebase/firestore';

/**
 * Página principal del quiz.
 * Muestra una pregunta a la vez con barra de progreso.
 * Al terminar, calcula el resultado y lo guarda en Firestore.
 */
export default function QuizPage() {
  const { usuario, cargando } = useAuth();
  const navigate = useNavigate();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [guardando, setGuardando] = useState(false);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!usuario) return <Navigate to="/auth" replace />;

  const pregunta = preguntas[preguntaActual];
  const totalPreguntas = preguntas.length;

  const handleResponder = async (opcionIndex) => {
    const nuevasRespuestas = [...respuestas, opcionIndex];
    setRespuestas(nuevasRespuestas);

    if (preguntaActual < totalPreguntas - 1) {
      setPreguntaActual((prev) => prev + 1);
    } else {
      // Quiz terminado — calcular y guardar
      setGuardando(true);
      const resultado = calcularPuntaje(nuevasRespuestas);

      // Extraer nombre y apellido del displayName de Firebase
      const displayName = usuario.displayName || '';
      const partes = displayName.split(' ');
      const nombre = partes[0] || '';
      const apellido = partes.slice(1).join(' ') || '';

      try {
        await guardarResultado({
          uid: usuario.uid,
          nombre,
          apellido,
          email: usuario.email,
          puntaje: resultado.correctas,
          porcentaje: resultado.porcentaje,
          nivelAlcanzado: resultado.nivel,
          indicesCorrectos: resultado.indicesCorrectos,
          indicesIncorrectos: resultado.indicesIncorrectos,
        });
      } catch (err) {
        console.error('Error al guardar resultado:', err);
      }

      navigate('/resultados', {
        state: {
          resultado,
          nombre,
          apellido,
          email: usuario.email,
        },
      });
    }
  };

  if (guardando) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
        <p className="text-slate-300 text-lg">Calculando tu resultado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800/60">
        <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          ExcelDiagnóstico
        </span>
        <span className="text-slate-400 text-sm">
          Hola, <span className="text-white font-medium">{(usuario.displayName || usuario.email).split(' ')[0]}</span>
        </span>
      </header>

      {/* Contenido */}
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Progreso */}
          <div className="mb-8">
            <ProgressBar
              actual={preguntaActual + 1}
              total={totalPreguntas}
              nivel={pregunta.nivel}
            />
          </div>

          {/* Card de pregunta */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <QuizQuestion
              key={preguntaActual}
              pregunta={pregunta}
              onResponder={handleResponder}
              index={preguntaActual}
            />
          </div>

          {/* Indicador de preguntas restantes */}
          <p className="text-center text-slate-600 text-xs mt-4">
            {totalPreguntas - preguntaActual - 1} preguntas restantes
          </p>
        </div>
      </main>
    </div>
  );
}
