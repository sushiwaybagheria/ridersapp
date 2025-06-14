// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔧 Sostituisci questi dati con la tua configurazione reale da Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyChQs5irzzyNSrxY3uefs-hxsrkev9v2oc",
  authDomain: "ridersapp-3074e.firebaseapp.com",
  projectId: "ridersapp-3074e",
  storageBucket: "ridersapp-3074e.firebasestorage.app",
  messagingSenderId: "1079146532856",
  appId: "1:1079146532856:web:f591a6ba34b638cadd900d"
};
// 🔥 Inizializzazione Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
