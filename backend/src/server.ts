import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import { getFirebaseAdmin } from './config/firebase.js';

const app = express();

// Security & Utility Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Initialize Firebase Admin (optional soft init)
getFirebaseAdmin();

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'College ERP Backend API (Multi-Tenant)',
  });
});

// Root API v1 Route
app.get(`/api/${config.apiVersion}`, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to College ERP Multi-Tenant SaaS API',
    version: config.apiVersion,
  });
});

// Start Server
app.listen(config.port, () => {
  console.log(`🚀 Server listening on http://localhost:${config.port}`);
  console.log(`📡 API endpoint: http://localhost:${config.port}/api/${config.apiVersion}`);
});
