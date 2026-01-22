import { z } from 'zod';

import { PROVIDER_MODES } from './providers';
import type { ProviderId, ProviderMetadata } from './providers';

export interface Artist {
  id: string;
  name: string;
  imageUrl?: string;
  genres?: string[];
  popularity?: number;
  uxLabel?: string;
}

export interface Track {
  id: string;
  name: string;
  artists?: { id: string; name: string }[];
  durationMs: number;
  previewUrl?: string;
  previewProxyUrl?: string;
}

export interface SearchArtistsResponse {
  items: Artist[];
}

export interface TopTracksResponse {
  items: Track[];
}

// Service status for similar artist search
export type ServiceStatus = 'success' | 'empty' | 'error' | 'unused' | 'rate-limited';

export interface ServiceMetadata {
  deezer: ServiceStatus;
  lastfm?: ServiceStatus;
  musicbrainz?: ServiceStatus;
  discogs?: ServiceStatus;
}

export interface RelatedArtistsResponse {
  items: Artist[];
  serviceMetadata?: ServiceMetadata;
}

export interface ProviderListResponse {
  default: ProviderId;
  items: ProviderMetadata[];
}

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  genres: z.array(z.string()).optional(),
  popularity: z.number().optional(),
  uxLabel: z.string().optional()
});

export const TrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artists: z
    .array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    )
    .optional(),
  durationMs: z.number(),
  previewUrl: z.string().optional(),
  previewProxyUrl: z.string().optional()
});

export const SearchArtistsResponseSchema = z.object({
  items: z.array(ArtistSchema)
});

export const TopTracksResponseSchema = z.object({
  items: z.array(TrackSchema)
});

const ServiceStatusSchema = z.enum(['success', 'empty', 'error', 'unused', 'rate-limited']);

const ServiceMetadataSchema = z.object({
  deezer: ServiceStatusSchema,
  lastfm: ServiceStatusSchema.optional(),
  musicbrainz: ServiceStatusSchema.optional(),
  discogs: ServiceStatusSchema.optional()
});

export const RelatedArtistsResponseSchema = z.object({
  items: z.array(ArtistSchema),
  serviceMetadata: ServiceMetadataSchema.optional()
});

export const ProviderMetadataSchema = z.object({
  id: z.enum(PROVIDER_MODES),
  label: z.string(),
  description: z.string(),
  supportsRelated: z.boolean(),
  supportsTopTracks: z.boolean()
});

export const ProviderListResponseSchema = z.object({
  default: z.enum(PROVIDER_MODES),
  items: z.array(ProviderMetadataSchema)
});

export {
  PROVIDERS,
  PROVIDER_MODES,
  DEFAULT_PROVIDER_MODE,
  isProviderId,
  type ProviderId,
  type ProviderMetadata
} from './providers';
