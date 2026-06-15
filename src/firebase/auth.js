import {
  signInAnonymously,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from './config';
import { localAuth } from './localAuth';

/**
 * Registra un nuevo usuario con nombre, apellido y email.
 * Usa autenticación anónima si está configurado para evitar errores de contraseñas/duplicados en los estudiantes.
 */
export async function registrarUsuario(nombre, apellido, email, password) {
  if (hasFirebaseConfig && auth) {
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

    // Persistir localmente los datos de identificación del estudiante
    localStorage.setItem('excel_student_email', email.trim());
    localStorage.setItem('excel_student_name', nombre.trim());
    localStorage.setItem('excel_student_surname', apellido.trim());
    
    return credencial;
  }
  
  return localAuth.registrar(nombre, apellido, email, password);
}

/**
 * Inicia sesión con email y contraseña (utilizado para el modo local/demo).
 */
export async function iniciarSesion(email, password) {
  if (hasFirebaseConfig && auth) {
    // No utilizado para estudiantes en modo Firebase, pero mantenemos compatibilidad por si acaso
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
    return signOut(auth);
  }
  return localAuth.cerrarSesion();
}
