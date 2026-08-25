import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join('.') || 'body',
            message: issue.message,
          })),
        },
      });
      return;
    }

    req.body = parsed.data;
    next();
  };
}
