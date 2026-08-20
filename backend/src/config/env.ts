import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'default_access_secret_change_me',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_change_me',
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  baseDomain: process.env.BASE_DOMAIN || 'localhost',
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
};
