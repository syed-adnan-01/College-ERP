import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authenticate } from './auth.middleware.js';
import { validate } from '../../middleware/validator.js';
import { authLimiter } from '../../middleware/rateLimiter.js';
import {
  firebaseLoginSchema,
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  resetPasswordSchema,
} from './auth.validation.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
router.post('/firebase-login', authLimiter, validate(firebaseLoginSchema), AuthController.firebaseLogin);
router.post('/refresh', validate(refreshTokenSchema), AuthController.refresh);
router.post('/logout', validate(logoutSchema), AuthController.logout);
router.get('/me', authenticate, AuthController.me);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

export const authRoutes = router;
