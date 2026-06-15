/**
 * Sistema de autenticación local (localStorage) para modo demo.
 * Proporciona la misma interfaz que Firebase Auth para compatibilidad.
 */

const STORAGE_KEY = 'excel_diag_users';
const SESSION_KEY = 'excel_diag_session';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// List of onChange listeners (simulates onAuthStateChanged)
const listeners = new Set();
let currentUser = getSession();

function notifyListeners(user) {
  listeners.forEach((fn) => fn(user));
}

export const localAuth = {
  registrar(nombre, apellido, email, password) {
    const users = getUsers();
    const emailNorm = email.toLowerCase().trim();

    if (users[emailNorm]) {
      const err = new Error('Email ya registrado');
      err.code = 'auth/email-already-in-use';
      throw err;
    }
    if (password.length < 6) {
      const err = new Error('Contraseña muy corta');
      err.code = 'auth/weak-password';
      throw err;
    }

    const uid = `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const user = {
      uid,
      email: emailNorm,
      displayName: `${nombre} ${apellido}`,
      nombre,
      apellido,
    };

    users[emailNorm] = { ...user, password };
    saveUsers(users);
    currentUser = user;
    saveSession(user);
    notifyListeners(user);

    return { user };
  },

  iniciarSesion(email, password) {
    const users = getUsers();
    const emailNorm = email.toLowerCase().trim();
    const stored = users[emailNorm];

    if (!stored) {
      const err = new Error('Usuario no encontrado');
      err.code = 'auth/user-not-found';
      throw err;
    }
    if (stored.password !== password) {
      const err = new Error('Contraseña incorrecta');
      err.code = 'auth/wrong-password';
      throw err;
    }

    const user = {
      uid: stored.uid,
      email: stored.email,
      displayName: stored.displayName,
    };

    currentUser = user;
    saveSession(user);
    notifyListeners(user);

    return { user };
  },

  cerrarSesion() {
    currentUser = null;
    clearSession();
    notifyListeners(null);
  },

  onAuthStateChanged(callback) {
    listeners.add(callback);
    // Call immediately with current state
    setTimeout(() => callback(currentUser), 0);
    return () => listeners.delete(callback);
  },

  getCurrentUser() {
    return currentUser;
  },
};
