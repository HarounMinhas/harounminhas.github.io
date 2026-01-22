import {
  ArtistSchema,
  RelatedArtistsResponseSchema,
  SearchArtistsResponseSchema,
  TopTracksResponseSchema,
  type Artist,
  type ProviderId,
  type Track,
  type ServiceMetadata
} from '@musicdiscovery/shared';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface FetchArtistDetailsOptions {
  topTrackLimit?: number;
  relatedLimit?: number;
}

export interface ArtistDetailsPayload {
  artist: Artist;
  topTracks: Track[];
  relatedArtists: Artist[];
  serviceMetadata?: ServiceMetadata;
}

export async function searchArtists(
  query: string,
  provider: ProviderId,
  limit = 10
): Promise<Artist[]> {
  const params = new URLSearchParams({
    query,
    provider,
    limit: String(limit)
  });
  const res = await fetch(`${API_URL}/music/search?${params}`);
  if (!res.ok) {
    throw new Error(`Search failed: ${res.statusText}`);
  }
  const data = await res.json();
  const parsed = SearchArtistsResponseSchema.parse(data);
  return parsed.items;
}

export async function fetchArtistDetails(
  artistId: string,
  provider: ProviderId,
  options: FetchArtistDetailsOptions = {}
): Promise<ArtistDetailsPayload> {
  const { topTrackLimit = 5, relatedLimit = 8 } = options;

  const artistParams = new URLSearchParams({ provider });
  const topTracksParams = new URLSearchParams({
    provider,
    limit: String(topTrackLimit)
  });
  const relatedParams = new URLSearchParams({
    provider,
    limit: String(relatedLimit)
  });

  const [artistRes, topTracksRes, relatedRes] = await Promise.all([
    fetch(`${API_URL}/music/artists/${encodeURIComponent(artistId)}?${artistParams}`),
    fetch(
      `${API_URL}/music/artists/${encodeURIComponent(artistId)}/top-tracks?${topTracksParams}`
    ),
    fetch(`${API_URL}/music/artists/${encodeURIComponent(artistId)}/related?${relatedParams}`)
  ]);

  if (!artistRes.ok) {
    throw new Error(`Failed to fetch artist: ${artistRes.statusText}`);
  }
  if (!topTracksRes.ok) {
    throw new Error(`Failed to fetch top tracks: ${topTracksRes.statusText}`);
  }
  if (!relatedRes.ok) {
    throw new Error(`Failed to fetch related artists: ${relatedRes.statusText}`);
  }

  const [artistData, topTracksData, relatedData] = await Promise.all([
    artistRes.json(),
    topTracksRes.json(),
    relatedRes.json()
  ]);

  const artist = ArtistSchema.parse(artistData);
  const topTracks = TopTracksResponseSchema.parse(topTracksData).items;
  const relatedResponse = RelatedArtistsResponseSchema.parse(relatedData);

  return {
    artist,
    topTracks,
    relatedArtists: relatedResponse.items,
    serviceMetadata: relatedResponse.serviceMetadata
  };
}
