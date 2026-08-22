import { Request, Response, NextFunction } from 'express';
import { TenantService } from './tenant.service.js';
import { Tenant } from '@college-erp/shared';
import { config } from '../../config/env.js';

declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
      tenantId?: string;
    }
  }
}

export async function tenantResolver(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let tenant: Tenant | null = null;

    // 1. Check X-Tenant-ID or X-Tenant-Slug header
    const headerTenantId = req.header('X-Tenant-ID') || req.header('x-tenant-id');
    const headerTenantSlug = req.header('X-Tenant-Slug') || req.header('x-tenant-slug');

    if (headerTenantId) {
      tenant = await TenantService.getTenantById(headerTenantId);
    }

    if (!tenant && headerTenantSlug) {
      tenant = await TenantService.getTenantBySlug(headerTenantSlug);
    }

    if ((headerTenantId || headerTenantSlug) && !tenant) {
      res.status(404).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'The requested tenant does not exist' },
      });
      return;
    }

    // 2. Extract tenant from Host / Subdomain (e.g., demo.eduplatform.com, demo.localhost)
    if (!tenant) {
      const host = req.headers.host || req.hostname || '';
      const cleanHost = host.split(':')[0].toLowerCase();
      
      // Check if domain matches directly
      tenant = await TenantService.getTenantByDomain(cleanHost);

      // Check subdomain logic if host has multiple segments (e.g. slug.domain.com or slug.localhost)
      if (!tenant) {
        const parts = cleanHost.split('.');
        if (parts.length >= 2) {
          const possibleSlug = parts[0];
          if (possibleSlug !== 'www' && possibleSlug !== 'api' && possibleSlug !== 'localhost') {
            tenant = await TenantService.getTenantBySlug(possibleSlug);
          }
        }
      }
    }

    // Local development may use the demo tenant; production must provide an explicit context.
    if (!tenant && config.allowDefaultTenant) {
      tenant = (await TenantService.getTenantBySlug('demo')) || (await TenantService.getAllTenants())[0] || null;
    }

    if (tenant) {
      req.tenant = tenant;
      req.tenantId = tenant.id;
    }

    next();
  } catch (error) {
    next(error);
  }
}
