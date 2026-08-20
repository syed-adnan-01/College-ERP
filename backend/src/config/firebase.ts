import admin from 'firebase-admin';
import { config } from './env.js';

let firebaseAdminApp: admin.app.App | null = null;

export function getFirebaseAdmin() {
  if (!firebaseAdminApp) {
    if (config.firebase.projectId && config.firebase.clientEmail) {
      firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.firebase.projectId,
          clientEmail: config.firebase.clientEmail,
          privateKey: config.firebase.privateKey,
        }),
      });
      console.log('🔥 Firebase Admin SDK initialized successfully');
    } else {
      console.warn('⚠️ Firebase Admin SDK credentials missing. Firebase features will be disabled.');
    }
  }
  return firebaseAdminApp;
}
