import { useState } from 'react';
import { iniciarSesion } from '../../firebase/auth';

/**
 * Formulario de inicio de sesión con email y contraseña.
 */
export default function LoginForm({ onToggle }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await Promise.resolve(iniciarSesion(form.email, form.password));
    } catch (err) {
      const mensajes = {
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/user-not-found': 'No existe una cuenta con ese correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Intentá más tarde.',
        'auth/invalid-email': 'El correo electrónico no es válido.',
      };
      setError(mensajes[err.code] || 'Ocurrió un error. Intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <h2 className="text-2xl font-bold text-white text-center mb-2">Bienvenido de vuelta</h2>
      <p className="text-slate-400 text-center text-sm mb-4">
        Iniciá sesión para continuar tu diagnóstico
      </p>

      <div>
        <label htmlFor="email-login" className="block text-sm font-medium text-slate-300 mb-1">
          Correo electrónico
        </label>
        <input
          id="email-login"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="juan@ejemplo.com"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="password-login" className="block text-sm font-medium text-slate-300 mb-1">
          Contraseña
        </label>
        <input
          id="password-login"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          placeholder="Tu contraseña"
          className="input-field"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={cargando}
        id="btn-iniciar-sesion"
        className="btn-primary w-full"
      >
        {cargando ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Ingresando...
          </span>
        ) : (
          'Iniciar sesión'
        )}
      </button>

      <p className="text-center text-slate-400 text-sm">
        ¿No tenés cuenta?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          Registrate gratis
        </button>
      </p>
    </form>
  );
}
