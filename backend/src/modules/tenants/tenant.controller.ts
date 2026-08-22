import { Request, Response } from 'express';
import { TenantService } from './tenant.service.js';
import { ApiResponse } from '@college-erp/shared';

export class TenantController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tenants = await TenantService.getAllTenants();
      const response: ApiResponse = {
        success: true,
        data: tenants,
      };
      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: error.message },
      });
    }
  }

  static async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const tenant = await TenantService.getTenantBySlug(slug);
      if (!tenant) {
        res.status(404).json({
          success: false,
          error: { code: 'TENANT_NOT_FOUND', message: `Tenant with slug '${slug}' not found` },
        });
        return;
      }
      res.json({
        success: true,
        data: tenant,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: error.message },
      });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const tenant = await TenantService.createTenant(req.body);
      res.status(201).json({
        success: true,
        data: tenant,
        message: 'Tenant created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: error.message },
      });
    }
  }

  static async getCurrent(req: Request, res: Response): Promise<void> {
    const tenant = (req as any).tenant || null;
    res.json({
      success: true,
      data: tenant,
    });
  }
}
