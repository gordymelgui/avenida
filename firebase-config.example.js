// Configuración de Firebase - EJEMPLO (Completa con tus credenciales)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN_HERE",
  projectId: "YOUR_FIREBASE_PROJECT_ID_HERE",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_FIREBASE_APP_ID_HERE",
  measurementId: "YOUR_FIREBASE_MEASUREMENT_ID_HERE"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar servicios
const auth = firebase.auth();
const db = firebase.firestore();

// Configurar persistencia de sesión
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Configuración de Firestore
db.settings({
  timestampsInSnapshots: true
});

// Variables globales
window.auth = auth;
window.db = db;
window.firebase = firebase;

console.log('🔥 Firebase (Ejemplo) configurado');
