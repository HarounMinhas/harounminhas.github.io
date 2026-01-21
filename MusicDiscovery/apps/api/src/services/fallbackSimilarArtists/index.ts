import type { Logger } from 'pino';
import { getSimilarArtistsFromDiscogs } from './discogs.js';
import { getSimilarArtistsFromLastFm } from './lastfm.js';
import { getSimilarArtistsFromMusicBrainz } from './musicbrainz.js';
import type { FallbackProvider, FallbackResult, FallbackSimilarArtist } from './types.js';

interface FallbackContext {
  log: Logger;
  query: string;
  limit: number;
}

export async function getDeterministicFallbackSimilarArtists(
  ctx: FallbackContext
): Promise<FallbackResult> {
  const { log, query, limit } = ctx;

  try {
    log.info({ query, limit }, 'deterministic fallback pipeline invoked');

    // 1) Last.fm
    const lastfm = await getSimilarArtistsFromLastFm(query, limit, log);
    if (lastfm.length > 0) {
      return { strategy: 'deterministic-fallback', items: reweightByConfidence(lastfm, 'lastfm'), cacheHit: false };
    }

    // 2) MusicBrainz
    const musicbrainz = await getSimilarArtistsFromMusicBrainz(query, limit, log);
    if (musicbrainz.length > 0) {
      return {
        strategy: 'deterministic-fallback',
        items: reweightByConfidence(musicbrainz, 'musicbrainz'),
        cacheHit: false
      };
    }

    // 3) Discogs
    const discogs = await getSimilarArtistsFromDiscogs(query, limit, log);
    if (discogs.length > 0) {
      return { strategy: 'deterministic-fallback', items: reweightByConfidence(discogs, 'discogs'), cacheHit: false };
    }

    return { strategy: 'deterministic-fallback', items: [], cacheHit: false };
  } catch (error) {
    // Never throw from fallback logic.
    log.warn({ err: error }, 'deterministic fallback pipeline failed (swallowed)');
    return { strategy: 'deterministic-fallback', items: [], cacheHit: false };
  }
}

function reweightByConfidence(items: FallbackSimilarArtist[], provider: FallbackProvider): FallbackSimilarArtist[] {
  const reliability = getProviderReliability(provider);

  // Reweight similarity by confidence so low-confidence matches do not outrank higher-confidence ones.
  // Keep scores within 0–1 and deterministic ordering.
  return items
    .map((item) => {
      const confidence = clamp01(item.confidenceScore);
      const similarity = clamp01(item.similarityScore);

      // Soft reweighting: similarity * (0.5 + 0.5*confidence) * reliability
      const weighted = clamp01(similarity * (0.5 + 0.5 * confidence) * reliability);

      return {
        ...item,
        similarityScore: weighted
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore);
}

function getProviderReliability(provider: FallbackProvider): number {
  switch (provider) {
    case 'lastfm':
      return 1.0;
    case 'musicbrainz':
      return 0.85;
    case 'discogs':
      return 0.8;
    default:
      return 0.8;
  }
}

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}
