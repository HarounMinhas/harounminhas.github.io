import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger.js';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = typeof err.status === 'number' ? err.status : 500;
  const code = err.code ?? 'server_error';
  const message = err.message ?? 'Unexpected error';

  if (status >= 500) {
    logger.error({ err }, 'Unhandled error');
  }

  res.status(status).json({ error: { code, message } });
}
