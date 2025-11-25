import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middlewares/auth.js';

export const me = Router();

me.use(requireAuth);

me.get('/me', async (req, res) => {
  const userId = (req as any).user.id as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { spotifyAuth: true },
  });

  if (!user) {
    return res.status(404).json({ error: { code: 'not_found', message: 'User not found' } });
  }

  res.json({
    id: user.id,
    provider: user.provider,
    email: user.email,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    locale: user.locale,
    market: user.market,
    spotifyLinked: !!user.spotifyAuth,
  });
});
