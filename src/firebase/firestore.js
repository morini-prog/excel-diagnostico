import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db, hasFirebaseConfig } from './config';
import { localStore } from './localStore';

const COLECCION = 'resultados';

/**
 * Guarda el resultado del diagnóstico.
 * Usa Firestore si está configurado, de lo contrario usa localStore.
 */
export async function guardarResultado(datos) {
  if (hasFirebaseConfig && db) {
    const docRef = await addDoc(collection(db, COLECCION), {
      ...datos,
      fecha: serverTimestamp(),
    });
    return docRef.id;
  }
  const id = localStore.guardar(datos);
  // Disparar evento para actualizar panel docente local en tiempo real si está abierto
  window.dispatchEvent(new Event('localstore-update'));
  return id;
}

/**
 * Recupera todos los resultados de un usuario específico.
 */
export async function obtenerResultadosPorUsuario(uid) {
  if (hasFirebaseConfig && db) {
    const q = query(
      collection(db, COLECCION),
      where('uid', '==', uid),
      orderBy('fecha', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return localStore.obtenerPorUid(uid);
}

/**
 * Recupera todos los resultados globales.
 */
export async function obtenerTodosLosResultados() {
  if (hasFirebaseConfig && db) {
    const q = query(collection(db, COLECCION), orderBy('fecha', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return localStore.obtenerTodos();
}

/**
 * Se suscribe en tiempo real a todos los resultados globales.
 * @param {function} callback - Función callback que recibe el array de resultados actualizado.
 * @returns {function} - Función para desuscribirse de la escucha.
 */
export function suscribirResultados(callback) {
  if (hasFirebaseConfig && db) {
    const q = query(collection(db, COLECCION), orderBy('fecha', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const resultados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(resultados);
    }, (error) => {
      console.error('Error en suscripción Firestore:', error);
    });
  }

  // Fallback en Modo Demo: emitir inicial y registrar escuchas
  callback(localStore.obtenerTodos());

  const handleUpdate = () => {
    callback(localStore.obtenerTodos());
  };

  window.addEventListener('localstore-update', handleUpdate);
  window.addEventListener('storage', handleUpdate); // Por si se abre en otra pestaña

  // Polling como resguardo adicional cada 2 segundos
  const intervalId = setInterval(handleUpdate, 2000);

  return () => {
    window.removeEventListener('localstore-update', handleUpdate);
    window.removeEventListener('storage', handleUpdate);
    clearInterval(intervalId);
  };
}
