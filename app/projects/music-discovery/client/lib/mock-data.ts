import { Artist, Track } from './types';

type MockGraph = {
  artist: Artist;
  related: string[];
  topTracks: Track[];
};

const previewUrl =
  'https://cdn.pixabay.com/download/audio/2021/09/01/audio_c3617c4a68.mp3?filename=ambient-110734.mp3';

const ARTISTS: Record<string, MockGraph> = {
  'tame-impala': {
    artist: {
      id: 'tame-impala',
      name: 'Tame Impala',
      imageUrl:
        'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=256&q=80',
      genres: ['psychedelic pop', 'australian psych'],
      popularity: 85,
    },
    related: ['pond', 'unknown-mortal-orchestra', 'mgmt', 'khruangbin', 'jungle'],
    topTracks: [
      { id: 'elephant', name: 'Elephant', durationMs: 234000, previewUrl, artists: [{ id: 'tame-impala', name: 'Tame Impala' }] },
      { id: 'let-it-happen', name: 'Let It Happen', durationMs: 332000, previewUrl, artists: [{ id: 'tame-impala', name: 'Tame Impala' }] },
      { id: 'the-less-i-know-the-better', name: 'The Less I Know the Better', durationMs: 216000, previewUrl, artists: [{ id: 'tame-impala', name: 'Tame Impala' }] },
    ],
  },
  pond: {
    artist: {
      id: 'pond',
      name: 'POND',
      imageUrl:
        'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=256&q=80',
      genres: ['psych rock', 'perth indie'],
      popularity: 64,
    },
    related: ['tame-impala', 'king-gizzard', 'melody-prose', 'unknown-mortal-orchestra'],
    topTracks: [
      { id: 'daisy', name: 'Daisy', durationMs: 248000, previewUrl, artists: [{ id: 'pond', name: 'POND' }] },
      { id: 'paint-me-silver', name: 'Paint Me Silver', durationMs: 258000, previewUrl, artists: [{ id: 'pond', name: 'POND' }] },
    ],
  },
  'unknown-mortal-orchestra': {
    artist: {
      id: 'unknown-mortal-orchestra',
      name: 'Unknown Mortal Orchestra',
      imageUrl:
        'https://images.unsplash.com/photo-1529158062015-cad636e69505?auto=format&fit=crop&w=256&q=80',
      genres: ['lo-fi psych', 'portland indie'],
      popularity: 70,
    },
    related: ['tame-impala', 'khruangbin', 'mild-high-club', 'king-gizzard'],
    topTracks: [
      { id: 'honeybee', name: 'Hunnybee', durationMs: 269000, previewUrl, artists: [{ id: 'unknown-mortal-orchestra', name: 'Unknown Mortal Orchestra' }] },
      { id: 'multi-love', name: 'Multi-Love', durationMs: 260000, previewUrl, artists: [{ id: 'unknown-mortal-orchestra', name: 'Unknown Mortal Orchestra' }] },
    ],
  },
  khruangbin: {
    artist: {
      id: 'khruangbin',
      name: 'Khruangbin',
      imageUrl:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=256&q=80',
      genres: ['psychedelic soul', 'thai funk'],
      popularity: 80,
    },
    related: ['men-i-trust', 'unknown-mortal-orchestra', 'mild-high-club', 'jungle'],
    topTracks: [
      { id: 'people-everywhere', name: 'People Everywhere (Still Alive)', durationMs: 275000, previewUrl, artists: [{ id: 'khruangbin', name: 'Khruangbin' }] },
      { id: 'time-you-and-i', name: 'Time (You and I)', durationMs: 312000, previewUrl, artists: [{ id: 'khruangbin', name: 'Khruangbin' }] },
    ],
  },
  jungle: {
    artist: {
      id: 'jungle',
      name: 'Jungle',
      imageUrl:
        'https://images.unsplash.com/photo-1529158062209-c095a807b3d5?auto=format&fit=crop&w=256&q=80',
      genres: ['modern soul', 'uk funk'],
      popularity: 82,
    },
    related: ['parcels', 'men-i-trust', 'khruangbin', 'glass-animals'],
    topTracks: [
      { id: 'busy-earnin', name: "Busy Earnin'", durationMs: 207000, previewUrl, artists: [{ id: 'jungle', name: 'Jungle' }] },
      { id: 'keep-moving', name: 'Keep Moving', durationMs: 217000, previewUrl, artists: [{ id: 'jungle', name: 'Jungle' }] },
    ],
  },
  parcels: {
    artist: {
      id: 'parcels',
      name: 'Parcels',
      imageUrl:
        'https://images.unsplash.com/photo-1527333656061-ca7c559ab776?auto=format&fit=crop&w=256&q=80',
      genres: ['disco', 'electro pop'],
      popularity: 68,
    },
    related: ['jungle', 'daft-punk', 'leisure'],
    topTracks: [
      { id: 'overnight', name: 'Overnight', durationMs: 252000, previewUrl, artists: [{ id: 'parcels', name: 'Parcels' }] },
    ],
  },
  'men-i-trust': {
    artist: {
      id: 'men-i-trust',
      name: 'Men I Trust',
      imageUrl:
        'https://images.unsplash.com/photo-1464375117522-1311d6a5b81a?auto=format&fit=crop&w=256&q=80',
      genres: ['dream pop', 'chillwave'],
      popularity: 75,
    },
    related: ['khruangbin', 'menomena', 'jungle'],
    topTracks: [
      { id: 'show-me-how', name: 'Show Me How', durationMs: 225000, previewUrl, artists: [{ id: 'men-i-trust', name: 'Men I Trust' }] },
      { id: 'lauren', name: 'Lauren', durationMs: 219000, previewUrl, artists: [{ id: 'men-i-trust', name: 'Men I Trust' }] },
    ],
  },
  'king-gizzard': {
    artist: {
      id: 'king-gizzard',
      name: 'King Gizzard & The Lizard Wizard',
      imageUrl:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=256&q=80',
      genres: ['psych rock', 'garage rock'],
      popularity: 78,
    },
    related: ['pond', 'unknown-mortal-orchestra', 'tame-impala'],
    topTracks: [
      { id: 'rattlesnake', name: 'Rattlesnake', durationMs: 420000, previewUrl, artists: [{ id: 'king-gizzard', name: 'King Gizzard & The Lizard Wizard' }] },
    ],
  },
  'mild-high-club': {
    artist: {
      id: 'mild-high-club',
      name: 'Mild High Club',
      imageUrl:
        'https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?auto=format&fit=crop&w=256&q=80',
      genres: ['lo-fi psych', 'indie'],
      popularity: 60,
    },
    related: ['unknown-mortal-orchestra', 'khruangbin', 'men-i-trust'],
    topTracks: [
      { id: 'homage', name: 'Homage', durationMs: 186000, previewUrl, artists: [{ id: 'mild-high-club', name: 'Mild High Club' }] },
    ],
  },
  'glass-animals': {
    artist: {
      id: 'glass-animals',
      name: 'Glass Animals',
      imageUrl:
        'https://images.unsplash.com/photo-1531315630201-bb15abeb1650?auto=format&fit=crop&w=256&q=80',
      genres: ['alt pop', 'neo-psychedelic'],
      popularity: 84,
    },
    related: ['jungle', 'tame-impala', 'foster-the-people'],
    topTracks: [
      { id: 'heat-waves', name: 'Heat Waves', durationMs: 239000, previewUrl, artists: [{ id: 'glass-animals', name: 'Glass Animals' }] },
    ],
  },
};

export function mockSearch(query: string, limit: number) {
  const normalized = query.trim().toLowerCase();
  const results = Object.values(ARTISTS)
    .map((entry) => entry.artist)
    .filter((artist) => artist.name.toLowerCase().includes(normalized));
  return Promise.resolve(results.slice(0, limit));
}

export function mockRelated(id: string) {
  const entry = ARTISTS[id];
  if (!entry) return Promise.resolve<Artist[]>([]);
  const related = entry.related
    .map((relatedId) => ARTISTS[relatedId]?.artist)
    .filter(Boolean) as Artist[];
  return Promise.resolve(related);
}

export function mockTopTracks(id: string) {
  const entry = ARTISTS[id];
  if (!entry) return Promise.resolve<Track[]>([]);
  return Promise.resolve(entry.topTracks);
}

export function mockArtist(id: string) {
  const entry = ARTISTS[id];
  return entry ? Promise.resolve(entry.artist) : Promise.resolve<Artist | null>(null);
}

export function mockFavorites(token: string) {
  if (typeof window === 'undefined') return Promise.resolve([]);
  const stored = window.localStorage.getItem(`musicdiscovery.favorites.${token}`);
  if (!stored) return Promise.resolve([]);
  return Promise.resolve(JSON.parse(stored));
}

export function mockAddFavorite(token: string, body: { artistId: string; name: string; imageUrl?: string }) {
  if (typeof window === 'undefined') return Promise.resolve(body);
  const key = `musicdiscovery.favorites.${token}`;
  const stored = window.localStorage.getItem(key);
  const list = stored ? (JSON.parse(stored) as typeof body[]) : [];
  if (!list.find((item) => item.artistId === body.artistId)) {
    list.push(body);
  }
  window.localStorage.setItem(key, JSON.stringify(list));
  return Promise.resolve(body);
}

export function mockSnapshots(token: string) {
  if (typeof window === 'undefined') return Promise.resolve([]);
  const key = `musicdiscovery.snapshots.${token}`;
  const stored = window.localStorage.getItem(key);
  if (!stored) return Promise.resolve([]);
  return Promise.resolve(JSON.parse(stored));
}

export function mockCreateSnapshot(token: string, body: { title: string; graphJson: any; previewUrl?: string }) {
  if (typeof window === 'undefined') return Promise.resolve(body);
  const key = `musicdiscovery.snapshots.${token}`;
  const stored = window.localStorage.getItem(key);
  const list = stored ? (JSON.parse(stored) as typeof body[]) : [];
  list.push(body);
  window.localStorage.setItem(key, JSON.stringify(list));
  return Promise.resolve(body);
}

export const mockUser = {
  token: 'demo-token',
  user: {
    id: 'demo-user',
    provider: 'anonymous',
    displayName: 'Demo Explorer',
  },
};
