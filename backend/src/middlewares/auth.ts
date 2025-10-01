import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../services/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : (req.cookies?.token as string | undefined);

  if (!token) {
    return res.status(401).json({ error: { code: 'unauthorized', message: 'Missing token' } });
  }

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: { code: 'unauthorized', message: 'Invalid token' } });
  }
}
