import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);
};

export const getFirebaseAuth = (): Auth | null => {
  if (!isFirebaseConfigured()) {
    return null;
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return getAuth(app);
};

export const signInWithGoogle = async (): Promise<string> => {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Authentication is not configured. Please add VITE_FIREBASE_* credentials to .env file.');
  }

  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const idToken = await userCredential.user.getIdToken();
  return idToken;
};

export const signInWithMicrosoft = async (): Promise<string> => {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Authentication is not configured. Please add VITE_FIREBASE_* credentials to .env file.');
  }

  const provider = new OAuthProvider('microsoft.com');
  const userCredential = await signInWithPopup(auth, provider);
  const idToken = await userCredential.user.getIdToken();
  return idToken;
};
