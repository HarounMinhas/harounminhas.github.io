import jwt from 'jsonwebtoken';
import { env } from '../env.js';

export type JwtUser = { id: string };

export function signToken(payload: JwtUser, expiresIn = '30d') {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtUser {
  return jwt.verify(token, env.JWT_SECRET) as JwtUser;
}
