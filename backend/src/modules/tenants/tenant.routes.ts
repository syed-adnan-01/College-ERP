import { Router } from 'express';
import { TenantController } from './tenant.controller.js';
import { authenticate, requireRole } from '../auth/auth.middleware.js';
import { validate } from '../../middleware/validator.js';
import { createTenantSchema } from './tenant.validation.js';
import { ROLES } from '@college-erp/shared';

const router = Router();

router.get('/', authenticate, requireRole(ROLES.SUPER_ADMIN), TenantController.getAll);
router.get('/current', TenantController.getCurrent);
router.get('/:slug', TenantController.getBySlug);
router.post('/', authenticate, requireRole(ROLES.SUPER_ADMIN), validate(createTenantSchema), TenantController.create);

export const tenantRoutes = router;
