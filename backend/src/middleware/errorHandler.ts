import type { NextFunction, Request, Response } from "express";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  const cause = error as { status?: number; code?: string; message?: string };
  res.status(cause.status ?? 500).json({
    success: false,
    error: { code: cause.code ?? "INTERNAL_SERVER_ERROR", message: cause.message ?? "An unexpected error occurred" },
  });
}