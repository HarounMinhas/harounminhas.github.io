import axios from 'axios';
import { env } from '../env.js';
import { cached } from './cache.js';

let appToken: { token: string; expiresAt: number } | null = null;

async function getAppAccessToken(): Promise<string> {
  const now = Date.now();
  if (appToken && appToken.expiresAt > now + 60_000) {
    return appToken.token;
  }

  const params = new URLSearchParams({ grant_type: 'client_credentials' });
  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    auth: { username: env.SPOTIFY_CLIENT_ID, password: env.SPOTIFY_CLIENT_SECRET },
  });

  const { access_token, expires_in } = response.data as { access_token: string; expires_in: number };
  appToken = { token: access_token, expiresAt: now + expires_in * 1000 };
  return appToken.token;
}

function mapArtist(artist: any) {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images?.[0]?.url,
    genres: artist.genres,
    popularity: artist.popularity,
  };
}

function mapTrack(track: any) {
  return {
    id: track.id,
    name: track.name,
    previewUrl: track.preview_url ?? undefined,
    durationMs: track.duration_ms,
    artists: track.artists?.map((a: any) => ({ id: a.id, name: a.name })) ?? [],
  };
}

export async function exchangeAuthCode(code: string) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: env.SPOTIFY_REDIRECT_URI,
  });

  const res = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    auth: { username: env.SPOTIFY_CLIENT_ID, password: env.SPOTIFY_CLIENT_SECRET },
  });

  return res.data as {
    access_token: string;
    token_type: 'Bearer';
    scope: string;
    expires_in: number;
    refresh_token: string;
  };
}

export async function refreshAuthToken(refreshToken: string) {
  const params = new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken });
  const res = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    auth: { username: env.SPOTIFY_CLIENT_ID, password: env.SPOTIFY_CLIENT_SECRET },
  });

  return {
    access_token: res.data.access_token as string,
    expires_in: res.data.expires_in as number,
    scope: res.data.scope as string | undefined,
  };
}

export async function getSpotifyUser(accessToken: string) {
  const res = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data as { id: string; display_name?: string; images?: { url: string }[]; email?: string };
}

export async function createPlaylist(accessToken: string, spotifyUserId: string, name: string, isPublic = false) {
  const res = await axios.post(
    `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
    { name, public: isPublic },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res.data as { id: string; external_urls: { spotify: string } };
}

export async function addTracksToPlaylist(accessToken: string, playlistId: string, trackIds: string[]) {
  if (!trackIds.length) return;
  const uris = trackIds.map((id) => `spotify:track:${id}`);
  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { uris },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
}

export const Spotify = {
  async searchArtists(query: string, limit = 10) {
    const token = await getAppAccessToken();
    const res = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: 'artist', limit },
    });
    return res.data.artists.items.map(mapArtist);
  },

  async getArtist(id: string) {
    return cached(`artist:${id}`, 60 * 60, async () => {
      const token = await getAppAccessToken();
      const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return mapArtist(res.data);
    });
  },

  async getRelatedArtists(id: string) {
    return cached(`artist:${id}:related`, 60 * 60 * 24, async () => {
      const token = await getAppAccessToken();
      const res = await axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.artists.map(mapArtist);
    });
  },

  async getTopTracks(id: string, market = env.DEFAULT_MARKET) {
    return cached(`artist:${id}:top:${market}`, 60 * 60 * 6, async () => {
      const token = await getAppAccessToken();
      const res = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { market },
      });
      return res.data.tracks.map(mapTrack);
    });
  },
};
