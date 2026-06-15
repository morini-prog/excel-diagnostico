import { useState } from 'react';
import { registrarUsuario } from '../../firebase/auth';

/**
 * Formulario de registro de nuevo usuario.
 * Recoge nombre, apellido, email y contraseña.
 */
export default function RegisterForm({ onToggle }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmar: '',
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellido.trim()) {
      setError('Por favor ingresá tu nombre y apellido.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setCargando(true);
    try {
      await Promise.resolve(registrarUsuario(form.nombre, form.apellido, form.email, form.password));
    } catch (err) {
      const mensajes = {
        'auth/email-already-in-use': 'Ese correo ya está registrado. Iniciá sesión.',
        'auth/invalid-email': 'El correo electrónico no tiene un formato válido.',
        'auth/weak-password': 'La contraseña es demasiado débil.',
      };
      setError(mensajes[err.code] || 'Ocurrió un error. Intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h2 className="text-2xl font-bold text-white text-center mb-2">Crear cuenta</h2>
      <p className="text-slate-400 text-center text-sm mb-4">
        Registrate para guardar tus resultados
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-1">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="given-name"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Juan"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-slate-300 mb-1">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            required
            autoComplete="family-name"
            value={form.apellido}
            onChange={handleChange}
            placeholder="García"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email-register" className="block text-sm font-medium text-slate-300 mb-1">
          Correo electrónico
        </label>
        <input
          id="email-register"
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
        <label htmlFor="password-register" className="block text-sm font-medium text-slate-300 mb-1">
          Contraseña
        </label>
        <input
          id="password-register"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo 6 caracteres"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="confirmar" className="block text-sm font-medium text-slate-300 mb-1">
          Confirmar contraseña
        </label>
        <input
          id="confirmar"
          name="confirmar"
          type="password"
          required
          autoComplete="new-password"
          value={form.confirmar}
          onChange={handleChange}
          placeholder="Repetí tu contraseña"
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
        id="btn-registrar"
        className="btn-primary w-full"
      >
        {cargando ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Registrando...
          </span>
        ) : (
          'Crear cuenta'
        )}
      </button>

      <p className="text-center text-slate-400 text-sm">
        ¿Ya tenés cuenta?{' '}
        <button
          type="button"
          onClick={onToggle}
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          Iniciá sesión
        </button>
      </p>
    </form>
  );
}
