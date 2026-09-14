// ⚠️ Reemplaza esto con la configuración de TU proyecto de Firebase.
// La encuentras en: Firebase Console → ⚙️ Configuración del proyecto → General →
// "Tus apps" → app web → "Config".
//
// Este objeto no es secreto — Firebase está diseñado para que la config del
// cliente sea pública. La seguridad real la dan las reglas de Firestore
// (ver firestore.rules) y el inicio de sesión obligatorio.
const firebaseConfig = {
  apiKey: "AIzaSyA6CnoLjQTRW80BK_K03dDURYVhynKFeXM",
  authDomain: "administracion-de-esenza.firebaseapp.com",
  projectId: "administracion-de-esenza",
  storageBucket: "administracion-de-esenza.firebasestorage.app",
  messagingSenderId: "413407309852",
  appId: "1:413407309852:web:98850a1857463719b8efd9",
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
