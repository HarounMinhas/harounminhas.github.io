import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { requireAuth } from '../middlewares/auth.js';
import { addTracksToPlaylist, createPlaylist } from '../services/spotify.js';

export const exportRouter = Router();

exportRouter.use(requireAuth);

exportRouter.post('/export/spotify-playlist', async (req, res) => {
  const userId = (req as any).user.id as string;
  const { name, trackIds, isPublic } = req.body as {
    name: string;
    trackIds: string[];
    isPublic?: boolean;
  };

  if (!trackIds?.length) {
    return res.status(400).json({ error: { code: 'validation_error', message: 'No tracks provided' } });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { spotifyAuth: true },
  });

  if (!user?.spotifyAuth) {
    return res.status(403).json({ error: { code: 'forbidden', message: 'Spotify account not linked' } });
  }

  const playlist = await createPlaylist(user.spotifyAuth.accessToken, user.spotifyAuth.spotifyUserId, name, !!isPublic);
  await addTracksToPlaylist(user.spotifyAuth.accessToken, playlist.id, trackIds);

  res.json({ playlistId: playlist.id, externalUrl: playlist.external_urls.spotify });
});
