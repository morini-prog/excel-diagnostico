/**
 * Almacenamiento local (localStorage) de resultados para modo demo.
 * Reemplaza Firestore cuando no hay credenciales de Firebase configuradas.
 */

const STORAGE_KEY = 'excel_diag_resultados';

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const localStore = {
  guardar(datos) {
    const items = getAll();
    const id = `local-res-${Date.now()}`;
    const nuevo = {
      id,
      ...datos,
      fecha: { toDate: () => new Date() }, // Simula Firestore Timestamp
    };
    items.unshift(nuevo); // más reciente primero
    saveAll(items);
    return id;
  },

  obtenerPorUid(uid) {
    return getAll().filter((item) => item.uid === uid);
  },

  obtenerPorEmail(email) {
    if (!email) return [];
    return getAll().filter((item) => item.email?.toLowerCase().trim() === email.toLowerCase().trim());
  },

  obtenerTodos() {
    return getAll();
  },

  borrarTodos() {
    saveAll([]);
  }
};
