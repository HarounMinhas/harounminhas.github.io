import { randomUUID } from 'node:crypto';
import pino from 'pino';
import pinoHttpLib from 'pino-http';
import type { Request, Response } from 'express';

import { env } from './env.js';

export const logger = pino({ level: env.LOG_LEVEL as string });

export function createRequestLogger() {
  return pinoHttpLib({
    logger,
    genReqId(req: Request, res: Response) {
      const existing = req.headers['x-request-id'];
      if (typeof existing === 'string' && existing.length > 0) {
        res.setHeader('x-request-id', existing);
        return existing;
      }
      const id = randomUUID();
      res.setHeader('x-request-id', id);
      return id;
    }
  });
}
