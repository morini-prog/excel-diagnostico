import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

/**
 * Página de autenticación que alterna entre login y registro.
 * Redirige automáticamente al quiz si el usuario ya está autenticado.
 */
export default function AuthPage() {
  const { usuario, cargando } = useAuth();
  const [modoRegistro, setModoRegistro] = useState(false);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (usuario) return <Navigate to="/quiz" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Excel
            </span>
            <span className="text-3xl font-black text-white">Diagnóstico</span>
          </a>
          <p className="text-slate-500 text-sm mt-2">Evaluación de habilidades profesionales</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-slate-900/60 rounded-xl p-1 mb-6">
            <button
              id="tab-login"
              onClick={() => setModoRegistro(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                !modoRegistro
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              id="tab-register"
              onClick={() => setModoRegistro(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                modoRegistro
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario activo */}
          {modoRegistro ? (
            <RegisterForm onToggle={() => setModoRegistro(false)} />
          ) : (
            <LoginForm onToggle={() => setModoRegistro(true)} />
          )}
        </div>

        {/* Enlace volver */}
        <p className="text-center mt-6 text-slate-600 text-sm">
          <a href="/" className="hover:text-slate-400 transition-colors">
            ← Volver al inicio
          </a>
        </p>
      </div>
    </div>
  );
}
