import {
  signInAnonymously,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from './config';
import { localAuth } from './localAuth';

/**
 * Registra un nuevo usuario con nombre, apellido y email.
 * Usa autenticación anónima si está configurado. Si falla, cae al modo localAuth sin bloquear al estudiante.
 */
export async function registrarUsuario(nombre, apellido, email, password) {
  // Guardar localmente los datos de identificación del estudiante en todos los casos
  localStorage.setItem('excel_student_email', email.trim());
  localStorage.setItem('excel_student_name', nombre.trim());
  localStorage.setItem('excel_student_surname', apellido.trim());

  if (hasFirebaseConfig && auth) {
    try {
      // Cerrar sesión previa si existiera
      try {
        await signOut(auth);
      } catch (e) {
        // ignorar
      }
      
      // Iniciar sesión anónimamente
      const credencial = await signInAnonymously(auth);
      
      // Guardar nombre y apellido en el perfil de Firebase
      await updateProfile(credencial.user, {
        displayName: `${nombre} ${apellido}`,
      });
      
      return credencial;
    } catch (firebaseError) {
      console.warn('[ExcelQuest] Error en Firebase Auth (ej: Autenticación Anónima desactivada). Usando fallback local.', firebaseError);
      // Cae al flujo local de abajo
    }
  }
  
  return localAuth.registrar(nombre, apellido, email, password);
}

/**
 * Inicia sesión con email y contraseña (utilizado para el modo local/demo).
 */
export async function iniciarSesion(email, password) {
  if (hasFirebaseConfig && auth) {
    return null;
  }
  return localAuth.iniciarSesion(email, password);
}

/**
 * Cierra la sesión del usuario actual.
 */
export async function cerrarSesion() {
  localStorage.removeItem('excel_student_email');
  localStorage.removeItem('excel_student_name');
  localStorage.removeItem('excel_student_surname');
  
  if (hasFirebaseConfig && auth) {
    try {
      return await signOut(auth);
    } catch (e) {
      // ignorar
    }
  }
  return localAuth.cerrarSesion();
}
