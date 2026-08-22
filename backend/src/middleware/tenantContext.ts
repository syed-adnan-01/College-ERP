import { Request, Response, NextFunction } from 'express';
import { tenantStorage } from '../shared/tenantContext.js';

export function attachTenantStore(req: Request, res: Response, next: NextFunction): void {
  if (!req.tenantId) {
    next();
    return;
  }

  tenantStorage.run({ tenantId: req.tenantId }, () => next());
}
