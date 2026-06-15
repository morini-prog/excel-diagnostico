import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  writeBatch,
  doc
} from 'firebase/firestore';
import { db, hasFirebaseConfig } from './config';
import { localStore } from './localStore';

const COLECCION = 'resultados';

/**
 * Guarda el resultado del diagnóstico.
 * Implementa una estrategia "local-first" escribiendo inmediatamente en localStore
 * y sincronizando en segundo plano con Firestore de forma no bloqueante.
 */
export async function guardarResultado(datos) {
  // 1. Guardar localmente de inmediato (cero demoras para el estudiante)
  const localId = localStore.guardar(datos);
  window.dispatchEvent(new Event('localstore-update'));

  // 2. Intentar guardar en Firestore en segundo plano (asíncrono y sin await)
  if (hasFirebaseConfig && db) {
    addDoc(collection(db, COLECCION), {
      ...datos,
      localId,
      fecha: serverTimestamp(),
    })
      .then((docRef) => {
        console.log('[ExcelQuest] Sincronizado exitosamente en la nube. ID:', docRef.id);
      })
      .catch((err) => {
        console.warn('[ExcelQuest] Falló la sincronización en Firestore (el registro permanece local):', err);
      });
  }

  // Devolvemos el ID local para que la UI pueda avanzar sin esperar al servidor
  return localId;
}

/**
 * Recupera todos los resultados de un usuario específico mediante su email.
 */
export async function obtenerResultadosPorUsuario(email) {
  if (!email) return [];
  
  if (hasFirebaseConfig && db) {
    try {
      const q = query(
        collection(db, COLECCION),
        where('email', '==', email.toLowerCase().trim()),
        orderBy('fecha', 'desc')
      );
      const snapshot = await getDocs(q);
      
      // Si tenemos datos de la nube, los combinamos con los locales
      const cloudData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (cloudData.length > 0) return cloudData;
    } catch (err) {
      console.warn('[ExcelQuest] Error al leer historial de Firestore, usando localStore fallback:', err);
    }
  }
  return localStore.obtenerPorEmail(email);
}

/**
 * Recupera todos los resultados globales.
 */
export async function obtenerTodosLosResultados() {
  if (hasFirebaseConfig && db) {
    try {
      const q = query(collection(db, COLECCION), orderBy('fecha', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn('[ExcelQuest] Error al leer todos los resultados de Firestore, usando localStore fallback:', err);
    }
  }
  return localStore.obtenerTodos();
}

/**
 * Borra todos los resultados globales de Firestore y de localStore.
 */
export async function borrarTodosLosResultados() {
  if (hasFirebaseConfig && db) {
    try {
      const q = query(collection(db, COLECCION));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      
      snapshot.docs.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });
      
      await batch.commit();
      console.log('[ExcelQuest] Todos los registros de Firestore han sido eliminados.');
    } catch (err) {
      console.warn('[ExcelQuest] Error al intentar borrar registros de Firestore:', err);
    }
  }
  
  // Limpiar también la base local
  localStore.borrarTodos();
  window.dispatchEvent(new Event('localstore-update'));
}

/**
 * Se suscribe en tiempo real a todos los resultados globales.
 * @param {function} callback - Función callback que recibe el array de resultados actualizado.
 * @returns {function} - Función para desuscribirse de la escucha.
 */
export function suscribirResultados(callback) {
  if (hasFirebaseConfig && db) {
    try {
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
    } catch (err) {
      console.warn('[ExcelQuest] Error al configurar suscripción Firestore. Usando fallback de localStorage.', err);
    }
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
