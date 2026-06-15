// Firebase configuration
// NOTE: Firebase web API keys are safe to expose in client-side code.
// Access is controlled via Firebase Security Rules in the console.
// 
// For local development: copy .env.example to .env and fill in your credentials.
// For Netlify deployment: set environment variables in the Netlify dashboard.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if Firebase credentials are configured
const hasFirebaseConfig =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'undefined' &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID;

let app, auth, db;

if (hasFirebaseConfig) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // Demo mode: mock Firebase for environments without credentials
  console.info('[ExcelDiagnóstico] Modo demo activo — usando almacenamiento local.');
  auth = null;
  db = null;
}

export { auth, db, hasFirebaseConfig };
export default app;
