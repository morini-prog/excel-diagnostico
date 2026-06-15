import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from './config';
import { localAuth } from './localAuth';

/**
 * Registra un nuevo usuario con nombre, apellido, email y contraseña.
 * Usa Firebase Auth si está configurado, de lo contrario usa localAuth.
 */
export async function registrarUsuario(nombre, apellido, email, password) {
  if (hasFirebaseConfig && auth) {
    const credencial = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credencial.user, {
      displayName: `${nombre} ${apellido}`,
    });
    return credencial;
  }
  return localAuth.registrar(nombre, apellido, email, password);
}

/**
 * Inicia sesión con email y contraseña.
 */
export async function iniciarSesion(email, password) {
  if (hasFirebaseConfig && auth) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  return localAuth.iniciarSesion(email, password);
}

/**
 * Cierra la sesión del usuario actual.
 */
export async function cerrarSesion() {
  if (hasFirebaseConfig && auth) {
    return signOut(auth);
  }
  return localAuth.cerrarSesion();
}
