// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔧 Configurazione del tuo progetto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChQs5irzzyNSrxY3uefs-hxsrkev9v2oc",
  authDomain: "ridersapp-3074e.firebaseapp.com",
  projectId: "ridersapp-3074e",
  storageBucket: "ridersapp-3074e.firebasestorage.app",
  messagingSenderId: "1079146532856",
  appId: "1:1079146532856:web:f591a6ba34b638cadd900d"
};

// 🔥 Inizializza Firebase e i servizi
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Aggiunto Firestore
export default app;

