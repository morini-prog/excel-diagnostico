import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
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
  return localStore.guardar(datos);
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
