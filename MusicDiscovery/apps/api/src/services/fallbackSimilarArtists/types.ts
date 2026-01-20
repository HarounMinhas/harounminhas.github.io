import type { SmartRelatedStrategy } from './smartRelatedService.js';

export type FallbackProvider = 'lastfm' | 'musicbrainz' | 'discogs';

export interface FallbackSimilarArtist {
  name: string;
  normalizedName: string;
  similarityScore: number;
  confidenceScore: number;
  uxLabel: string;
  source: FallbackProvider;
}

export interface FallbackResult {
  strategy: SmartRelatedStrategy | 'deterministic-fallback';
  items: FallbackSimilarArtist[];
  cacheHit: boolean;
}
