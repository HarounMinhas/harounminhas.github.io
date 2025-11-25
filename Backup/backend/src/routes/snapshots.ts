import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middlewares/auth.js';

export const snapshots = Router();

snapshots.use(requireAuth);

snapshots.get('/snapshots', async (req, res) => {
  const userId = (req as any).user.id as string;
  const items = await prisma.snapshot.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ items });
});

snapshots.post('/snapshots', async (req, res) => {
  const userId = (req as any).user.id as string;
  const { title, graphJson, previewUrl } = req.body as { title: string; graphJson: unknown; previewUrl?: string };

  const snapshot = await prisma.snapshot.create({
    data: { userId, title, graphJson, previewUrl },
  });

  res.status(201).json(snapshot);
});

snapshots.get('/snapshots/:id', async (req, res) => {
  const userId = (req as any).user.id as string;
  const snapshot = await prisma.snapshot.findFirst({
    where: { id: req.params.id, userId },
  });

  if (!snapshot) {
    return res.status(404).json({ error: { code: 'not_found', message: 'Snapshot not found' } });
  }

  res.json(snapshot);
});

snapshots.delete('/snapshots/:id', async (req, res) => {
  const userId = (req as any).user.id as string;
  await prisma.snapshot.deleteMany({
    where: { id: req.params.id, userId },
  });
  res.status(204).end();
});
