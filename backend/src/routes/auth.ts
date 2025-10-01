import { Router } from 'express';
import { prisma } from '../services/prisma.js';
import { signToken } from '../services/jwt.js';
import { env } from '../env.js';
import { exchangeAuthCode, getSpotifyUser } from '../services/spotify.js';

export const auth = Router();

auth.post('/auth/anonymous', async (_req, res) => {
  const user = await prisma.user.create({ data: { provider: 'anonymous' } });
  const token = signToken({ id: user.id });
  res.json({ token, user });
});

auth.get('/auth/spotify/login', (_req, res) => {
  const scopes = ['playlist-modify-public', 'playlist-modify-private'];
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.SPOTIFY_CLIENT_ID,
    scope: scopes.join(' '),
    redirect_uri: env.SPOTIFY_REDIRECT_URI,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

auth.get('/auth/spotify/callback', async (req, res) => {
  const code = String(req.query.code || '');
  if (!code) {
    return res.status(400).send('Missing code');
  }

  const tokens = await exchangeAuthCode(code);
  const me = await getSpotifyUser(tokens.access_token);

  const user = await prisma.user.upsert({
    where: { spotifyId: me.id },
    update: {
      provider: 'spotify',
      email: me.email ?? `${me.id}@spotify.local`,
      displayName: me.display_name,
      avatarUrl: me.images?.[0]?.url,
      spotifyAuth: {
        upsert: {
          update: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            scope: tokens.scope,
            expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
            spotifyUserId: me.id,
          },
          create: {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            scope: tokens.scope,
            expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
            spotifyUserId: me.id,
          },
        },
      },
    },
    create: {
      provider: 'spotify',
      email: me.email ?? `${me.id}@spotify.local`,
      displayName: me.display_name,
      avatarUrl: me.images?.[0]?.url,
      locale: 'nl',
      market: 'BE',
      spotifyId: me.id,
      spotifyAuth: {
        create: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          scope: tokens.scope,
          expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          spotifyUserId: me.id,
        },
      },
    },
  });

  if (!user.spotifyId) {
    await prisma.user.update({ where: { id: user.id }, data: { spotifyId: me.id } });
  }

  const jwt = signToken({ id: user.id });
  const redirectUrl = `${env.CORS_ORIGIN}/library#token=${jwt}`;
  res.redirect(redirectUrl);
});
