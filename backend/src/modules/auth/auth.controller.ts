import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const tenantIdContext = req.tenantId || req.body.tenantId;
      const result = await AuthService.login(req.body, tenantIdContext);
      res.json({
        success: true,
        data: result,
        message: 'Login successful',
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: error.message },
      });
    }
  }

  static async firebaseLogin(req: Request, res: Response): Promise<void> {
    try {
      const tenantIdContext = req.tenantId || req.body.tenantId;
      const result = await AuthService.firebaseLogin(req.body, tenantIdContext);
      res.json({
        success: true,
        data: result,
        message: 'Firebase authentication successful',
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: { code: 'FIREBASE_AUTH_FAILED', message: error.message },
      });
    }
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.refreshToken(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: error.message },
      });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    await AuthService.logout(req.body);
    res.json({
      success: true,
      message: 'Logout successful',
    });
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      const authUser = (req as any).user;
      if (!authUser) {
        res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Not authenticated' },
        });
        return;
      }

      const fullUser = await AuthService.getUserById(authUser.id);
      res.json({
        success: true,
        data: fullUser || authUser,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: error.message },
      });
    }
  }

  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.forgotPassword(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: error.message },
      });
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.resetPassword(req.body);
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: error.message },
      });
    }
  }
}
