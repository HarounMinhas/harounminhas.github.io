import { Router } from 'express';
import { Spotify } from '../services/spotify.js';

export const spotify = Router();

spotify.get('/spotify/search', async (req, res) => {
  const query = String(req.query.query ?? '');
  const limit = Number(req.query.limit ?? 10);
  const items = await Spotify.searchArtists(query, limit);
  res.json({ items });
});

spotify.get('/spotify/artists/:id', async (req, res) => {
  const artist = await Spotify.getArtist(req.params.id);
  res.json(artist);
});

spotify.get('/spotify/artists/:id/related', async (req, res) => {
  const items = await Spotify.getRelatedArtists(req.params.id);
  res.json({ items });
});

spotify.get('/spotify/artists/:id/top-tracks', async (req, res) => {
  const market = typeof req.query.market === 'string' ? req.query.market : undefined;
  const items = await Spotify.getTopTracks(req.params.id, market);
  res.json({ items });
});
