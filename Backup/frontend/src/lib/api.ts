import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api',
});

export type ApiList<T> = { items: T[] };

export const Api = {
  async anonymousAuth() {
    const res = await api.post('/auth/anonymous');
    return res.data as { token: string; user: any };
  },

  async searchArtists(query: string, limit = 10) {
    const res = await api.get<ApiList<any>>('/spotify/search', { params: { query, limit } });
    return res.data.items;
  },

  async getRelated(id: string) {
    const res = await api.get<ApiList<any>>(`/spotify/artists/${id}/related`);
    return res.data.items;
  },

  async getTopTracks(id: string, market?: string) {
    const res = await api.get<ApiList<any>>(`/spotify/artists/${id}/top-tracks`, {
      params: { market },
    });
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
