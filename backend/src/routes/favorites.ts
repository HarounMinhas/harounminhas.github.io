import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middlewares/auth.js';

export const favorites = Router();

favorites.use(requireAuth);

favorites.get('/favorites', async (req, res) => {
  const userId = (req as any).user.id as string;
  const items = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { addedAt: 'desc' },
  });
  res.json({ items });
});

favorites.post('/favorites', async (req, res) => {
  const userId = (req as any).user.id as string;
  const { artistId, name, imageUrl } = req.body as { artistId: string; name: string; imageUrl?: string };

  const favorite = await prisma.favorite.upsert({
    where: { userId_artistId: { userId, artistId } },
    update: { name, imageUrl },
    create: { userId, artistId, name, imageUrl },
  });

  res.status(201).json(favorite);
});

favorites.delete('/favorites/:artistId', async (req, res) => {
  const userId = (req as any).user.id as string;
  await prisma.favorite.delete({
    where: { userId_artistId: { userId, artistId: req.params.artistId } },
  });
  res.status(204).end();
});
