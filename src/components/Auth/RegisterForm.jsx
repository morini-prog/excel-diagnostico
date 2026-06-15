import { useState } from 'react';
import { registrarUsuario } from '../../firebase/auth';

/**
 * Formulario de registro de estudiante.
 * Recoge únicamente Nombre, Apellido y Correo electrónico.
 */
export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreClean = form.nombre.trim();
    const apellidoClean = form.apellido.trim();
    const emailClean = form.email.trim();

    if (!nombreClean || !apellidoClean) {
      setError('Por favor, ingresa tu nombre y apellido.');
      return;
    }
    if (!emailClean) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    setCargando(true);
    // Generar contraseña silenciosa (para compatibilidad con modo demo de localAuth)
    const passwordSilenciosa = `excelito_${emailClean.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    try {
      await registrarUsuario(nombreClean, apellidoClean, emailClean, passwordSilenciosa);
    } catch (err) {
      const mensajes = {
        'auth/invalid-email': 'El correo electrónico no tiene un formato válido.',
        'auth/email-already-in-use': 'Este correo electrónico ya está registrado.',
      };
      setError(mensajes[err.code] || 'Ocurrió un error. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-black text-white">Registro de Estudiante</h2>
        <p className="text-slate-400 text-sm mt-1">
          Ingresa tus datos antes de comenzar el diagnóstico
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            placeholder="Ej. Juan"
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
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
            placeholder="Ej. Pérez"
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
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
          placeholder="Ej. juan.perez@colegio.com"
          className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={cargando}
        id="btn-registrar"
        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-base"
      >
        {cargando ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Registrando...
          </>
        ) : (
          'Comenzar Test 🎮'
        )}
      </button>
    </form>
  );
}
