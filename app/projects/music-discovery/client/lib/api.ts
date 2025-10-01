'use client';

import axios from 'axios';
import {
  mockAddFavorite,
  mockCreateSnapshot,
  mockFavorites,
  mockRelated,
  mockSearch,
  mockSnapshots,
  mockTopTracks,
  mockUser,
} from './mock-data';
import type { Artist, Track } from './types';

const envBase = process.env.NEXT_PUBLIC_API_BASE;
const baseURL = envBase && envBase.trim().length > 0 ? envBase : null;
const http = baseURL
  ? axios.create({
      baseURL: baseURL.endsWith('/api') ? baseURL : `${baseURL.replace(/\/$/, '')}/api`,
      withCredentials: true,
    })
  : null;

type ApiList<T> = { items: T[] };

async function withFallback<T>(action: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  if (!http) return fallback();
  try {
    return await action();
  } catch (error) {
    console.warn('[MusicDiscovery] API request failed, falling back to mock data.', error);
    return fallback();
  }
}

export const Api = {
  async anonymousAuth() {
    if (!http) return mockUser;
    try {
      const res = await http.post('/auth/anonymous');
      return res.data as { token: string; user: any };
    } catch (error) {
      console.warn('[MusicDiscovery] Anonymous auth failed, using demo token.', error);
      return mockUser;
    }
  },

  async searchArtists(query: string, limit = 10) {
    return withFallback(
      async () => {
        const res = await http!.get<ApiList<Artist>>('/spotify/search', { params: { query, limit } });
        return res.data.items;
      },
      () => mockSearch(query, limit),
    );
  },

  async getRelated(id: string) {
    return withFallback(
      async () => {
        const res = await http!.get<ApiList<Artist>>(`/spotify/artists/${id}/related`);
        return res.data.items;
      },
      () => mockRelated(id),
    );
  },

  async getTopTracks(id: string, market?: string) {
    return withFallback(
      async () => {
        const res = await http!.get<ApiList<Track>>(`/spotify/artists/${id}/top-tracks`, { params: { market } });
        return res.data.items;
      },
      () => mockTopTracks(id),
    );
  },

  async favorites(token: string) {
    return withFallback(
      async () => {
        const res = await http!.get<ApiList<any>>('/favorites', { headers: { Authorization: `Bearer ${token}` } });
        return res.data.items;
      },
      () => mockFavorites(token),
    );
  },

  async addFavorite(token: string, body: { artistId: string; name: string; imageUrl?: string }) {
    if (!http) {
      await mockAddFavorite(token, body);
      return body;
    }
    try {
      const res = await http.post('/favorites', body, { headers: { Authorization: `Bearer ${token}` } });
      return res.data;
    } catch (error) {
      console.warn('[MusicDiscovery] Failed to persist favorite, storing locally.', error);
      await mockAddFavorite(token, body);
      return body;
    }
  },

  async listSnapshots(token: string) {
    return withFallback(
      async () => {
        const res = await http!.get<ApiList<any>>('/snapshots', { headers: { Authorization: `Bearer ${token}` } });
        return res.data.items;
      },
      () => mockSnapshots(token),
    );
  },

  async createSnapshot(token: string, body: { title: string; graphJson: any; previewUrl?: string }) {
    if (!http) {
      await mockCreateSnapshot(token, body);
      return body;
    }
    try {
      const res = await http.post('/snapshots', body, { headers: { Authorization: `Bearer ${token}` } });
      return res.data;
    } catch (error) {
      console.warn('[MusicDiscovery] Failed to persist snapshot, storing locally.', error);
      await mockCreateSnapshot(token, body);
      return body;
    }
  },
};

export type { Artist, Track };
