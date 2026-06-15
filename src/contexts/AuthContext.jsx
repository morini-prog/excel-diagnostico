import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, hasFirebaseConfig } from '../firebase/config';
import { localAuth } from '../firebase/localAuth';

const AuthContext = createContext(null);

/**
 * Proveedor global de autenticación.
 * Funciona con Firebase Auth (autenticación anónima para estudiantes) o con localAuth (modo demo).
 * Expone el usuario actual y el estado de carga.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let unsubscribe;

    if (hasFirebaseConfig && auth) {
      // Firebase Auth: escuchar cambios de estado
      unsubscribe = onAuthStateChanged(auth, (user) => {
        const localEmail = localStorage.getItem('excel_student_email');
        if (user) {
          // Si el usuario está autenticado, construimos el perfil enriquecido
          setUsuario({
            uid: user.uid,
            displayName: user.displayName || `${localStorage.getItem('excel_student_name') || ''} ${localStorage.getItem('excel_student_surname') || ''}`.trim(),
            email: localEmail || user.email,
          });
        } else if (localEmail) {
          // Fallback: No hay sesión en Firebase Auth, pero el estudiante tiene credenciales locales guardadas
          setUsuario({
            uid: `local-${localEmail.replace(/[^a-zA-Z0-9]/g, '')}`,
            displayName: `${localStorage.getItem('excel_student_name') || ''} ${localStorage.getItem('excel_student_surname') || ''}`.trim(),
            email: localEmail,
            isFallback: true
          });
        } else {
          setUsuario(null);
        }
        setCargando(false);
      });
    } else {
      // Modo demo: escuchar localAuth
      unsubscribe = localAuth.onAuthStateChanged((user) => {
        setUsuario(user);
        setCargando(false);
      });
    }

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acceder al contexto de autenticación.
 * @returns {{ usuario: object | null, cargando: boolean }}
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
