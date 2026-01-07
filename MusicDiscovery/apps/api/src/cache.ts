import { LRUCache } from 'lru-cache';

interface CacheEntry<T> {
  value: T;
}

const DEFAULT_MAX_ITEMS = 5000;
const DEFAULT_TTL_MS = 10 * 60 * 1000;

const defaultCache = new LRUCache<string, CacheEntry<unknown>>({
  max: DEFAULT_MAX_ITEMS,
  ttl: DEFAULT_TTL_MS,
  ttlAutopurge: true
});

export type CacheStore<T> = LRUCache<string, CacheEntry<T>, unknown>;

export function createCache<T>(options: LRUCache.Options<string, CacheEntry<T>, unknown> = {}): CacheStore<T> {
  return new LRUCache<string, CacheEntry<T>, unknown>({
    max: DEFAULT_MAX_ITEMS,
    ttl: DEFAULT_TTL_MS,
    ttlAutopurge: true,
    ...options
  });
}

export async function withCache<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
  store: CacheStore<unknown> = defaultCache
): Promise<T> {
  const cached = store.get(key);
  if (cached) {
    return cached.value as T;
  }
  const value = await loader();
  store.set(key, { value }, { ttl: ttlMs });
  return value;
}

export function clearCache(store: CacheStore<unknown> = defaultCache): void {
  store.clear();
}
