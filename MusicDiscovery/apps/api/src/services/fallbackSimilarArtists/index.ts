import type { Logger } from 'pino';
import type { FallbackResult } from './types.js';

interface FallbackContext {
  log: Logger;
  query: string;
  limit: number;
}

// Issue 1: architecture only.
// Providers (Last.fm/MusicBrainz/Discogs) are implemented in subsequent issues.
export async function getDeterministicFallbackSimilarArtists(
  ctx: FallbackContext
): Promise<FallbackResult> {
  const { log, query, limit } = ctx;

  try {
    log.info({ query, limit }, 'deterministic fallback pipeline invoked');

    // Strict order is defined here.
    // 1) Last.fm
    // 2) MusicBrainz
    // 3) Discogs
    // Each provider will be called only when the aggregated results are still empty.

    // Placeholder: no providers wired in yet.
    return { strategy: 'deterministic-fallback', items: [], cacheHit: false };
  } catch (error) {
    // Never throw from fallback logic.
    log.warn({ err: error }, 'deterministic fallback pipeline failed (swallowed)');
    return { strategy: 'deterministic-fallback', items: [], cacheHit: false };
  }
}
