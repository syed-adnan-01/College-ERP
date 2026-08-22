import dotenv from 'dotenv';
import crypto from 'node:crypto';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const developmentSecret = () => crypto.randomBytes(32).toString('hex');
const accessSecret = process.env.JWT_ACCESS_SECRET || (isProduction ? '' : developmentSecret());
const refreshSecret = process.env.JWT_REFRESH_SECRET || (isProduction ? '' : developmentSecret());

if (isProduction && (!accessSecret || !refreshSecret)) {
  throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET are required in production');
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    accessSecret,
    refreshSecret,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  baseDomain: process.env.BASE_DOMAIN || 'localhost',
  allowDefaultTenant: process.env.ALLOW_DEFAULT_TENANT === 'true' || !isProduction,
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
};
