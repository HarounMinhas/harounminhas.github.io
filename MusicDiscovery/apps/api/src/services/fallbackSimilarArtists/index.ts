import type { Logger } from 'pino';
import { getSimilarArtistsFromLastFm } from './lastfm.js';
import { getSimilarArtistsFromMusicBrainz } from './musicbrainz.js';
import type { FallbackResult } from './types.js';

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
      return { strategy: 'deterministic-fallback', items: lastfm, cacheHit: false };
    }

    // 2) MusicBrainz
    const musicbrainz = await getSimilarArtistsFromMusicBrainz(query, limit, log);
    if (musicbrainz.length > 0) {
      return { strategy: 'deterministic-fallback', items: musicbrainz, cacheHit: false };
    }

    // 3) Discogs (Issue 4)

    return { strategy: 'deterministic-fallback', items: [], cacheHit: false };
  } catch (error) {
    // Never throw from fallback logic.
    log.warn({ err: error }, 'deterministic fallback pipeline failed (swallowed)');
    return { strategy: 'deterministic-fallback', items: [], cacheHit: false };
  }
}
