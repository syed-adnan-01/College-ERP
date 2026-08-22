import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import { getFirebaseAdmin } from './config/firebase.js';
import { connectDatabase } from './config/database.js';
import { tenantResolver } from './modules/tenants/tenant.middleware.js';
import { attachTenantStore } from './middleware/tenantContext.js';
import { tenantRoutes } from './modules/tenants/tenant.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

getFirebaseAdmin();

app.use(tenantResolver);
app.use(attachTenantStore);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'College ERP Backend API (Multi-Tenant)',
    tenant: req.tenant
      ? { id: req.tenant.id, slug: req.tenant.slug, name: req.tenant.name }
      : null,
  });
});

app.get(`/api/${config.apiVersion}`, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to College ERP Multi-Tenant SaaS API',
    version: config.apiVersion,
    activeTenant: req.tenant ? req.tenant.name : 'Platform Level',
  });
});

app.use(`/api/${config.apiVersion}/tenants`, tenantRoutes);
app.use(`/api/${config.apiVersion}/auth`, authRoutes);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = err as { status?: number; code?: string; message?: string };
  console.error('Unhandled Error:', error);
  res.status(error.status || 500).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'An unexpected error occurred',
    },
  });
});

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
    .then(() => {
      app.listen(config.port, () => {
        console.log(`Server listening on http://localhost:${config.port}`);
        console.log(`API endpoint: http://localhost:${config.port}/api/${config.apiVersion}`);
      });
    })
    .catch((error) => {
      console.error('Failed to connect to PostgreSQL. Set DATABASE_URL and run migrations.', error);
      process.exit(1);
    });
}

export default app;
