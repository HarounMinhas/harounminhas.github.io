import axios from 'axios';

const DEFAULT_API_BASE = 'https://harounminhas-github-io.onrender.com/api';
export const API_BASE = (import.meta.env.VITE_API_BASE?.trim() || DEFAULT_API_BASE).replace(/\/$/, '');

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

type RetryOptions = {
  retries?: number;
  retryDelayMs?: number;
  retryLabel?: string;
};

const sleep = (delayMs: number) => new Promise((resolve) => window.setTimeout(resolve, delayMs));

const shouldRetry = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return false;
  }
  if (error.code === 'ECONNABORTED') {
    return true;
  }
  const status = error.response?.status;
  return !status || status >= 500 || status === 429;
};

async function requestWithRetry<T>(request: () => Promise<T>, options: RetryOptions = {}) {
  const { retries = 2, retryDelayMs = 1200, retryLabel = 'api-request' } = options;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      const canRetry = attempt < retries && shouldRetry(error);
      if (!canRetry) {
        throw error;
      }
      console.warn(`[MusicDiscovery] ${retryLabel} failed on attempt ${attempt + 1}; retrying...`, error);
      await sleep(retryDelayMs * (attempt + 1));
    }
  }

  throw new Error('Unexpected retry state.');
}

export type ApiList<T> = { items: T[] };

export const Api = {
  async anonymousAuth() {
    const res = await requestWithRetry(() => api.post('/auth/anonymous'), {
      retryLabel: 'anonymous-auth',
    });
    return res.data as { token: string; user: any };
  },

  async searchArtists(query: string, limit = 10) {
    const res = await requestWithRetry(
      () => api.get<ApiList<any>>('/spotify/search', { params: { query, limit } }),
      { retryLabel: 'search-artists' },
    );
    return res.data.items;
  },

  async getRelated(id: string) {
    const res = await requestWithRetry(() => api.get<ApiList<any>>(`/spotify/artists/${id}/related`), {
      retryLabel: 'related-artists',
    });
    return res.data.items;
  },

  async getTopTracks(id: string, market?: string) {
    const res = await requestWithRetry(
      () =>
        api.get<ApiList<any>>(`/spotify/artists/${id}/top-tracks`, {
          params: { market },
        }),
      { retryLabel: 'top-tracks' },
    );
    return res.data.items;
  },

  async me(token: string) {
    const res = await api.get('/me', { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },

  async favorites(token: string) {
    const res = await api.get('/favorites', { headers: { Authorization: `Bearer ${token}` } });
    return res.data.items as { artistId: string; name: string; imageUrl?: string }[];
  },

  async addFavorite(token: string, body: { artistId: string; name: string; imageUrl?: string }) {
    const res = await api.post('/favorites', body, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },

  async removeFavorite(token: string, artistId: string) {
    await api.delete(`/favorites/${artistId}`, { headers: { Authorization: `Bearer ${token}` } });
  },

  async listSnapshots(token: string) {
    const res = await api.get('/snapshots', { headers: { Authorization: `Bearer ${token}` } });
    return res.data.items as { id: string; title: string; graphJson: any }[];
  },

  async createSnapshot(token: string, body: { title: string; graphJson: any; previewUrl?: string }) {
    const res = await api.post('/snapshots', body, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },
};

export default api;
