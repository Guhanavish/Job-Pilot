const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

let app = null;
let auth = null;
let provider = null;
let db = null;

if (hasFirebaseConfig) {
  const { initializeApp } = await import('firebase/app');
  const { getAuth, GoogleAuthProvider } = await import('firebase/auth');
  const { getFirestore } = await import('firebase/firestore');
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  db = getFirestore(app);
}

export { app, auth, provider, db, hasFirebaseConfig };
