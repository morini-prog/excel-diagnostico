import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';

/**
 * Página de autenticación para estudiantes.
 * Muestra el formulario de registro y redirige al quiz si ya se ha autenticado.
 */
export default function AuthPage() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (usuario) return <Navigate to="/quiz" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Luces de fondo arcade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block transition-transform hover:scale-105">
            <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Excel
            </span>
            <span className="text-3xl font-black text-white">Quest</span>
          </a>
          <p className="text-slate-500 text-sm mt-2">Pon a prueba tu conocimiento interactivo</p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-emerald-500/5">
          <RegisterForm />
        </div>

        {/* Enlace Volver */}
        <p className="text-center mt-6">
          <a href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            ← Volver al inicio
          </a>
        </p>
      </div>
    </div>
  );
}
