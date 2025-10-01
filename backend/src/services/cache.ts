import { createClient } from 'redis';
import { env } from '../env.js';

let client: ReturnType<typeof createClient> | null = null;

export async function getCache() {
  if (!env.REDIS_URL) return null;
  if (!client) {
    client = createClient({ url: env.REDIS_URL });
    client.on('error', (error) => {
      console.error('Redis error', error);
    });
    await client.connect();
  }
  return client;
}

export async function cached<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
  const redis = await getCache();
  if (!redis) return fetcher();

  const hit = await redis.get(key);
  if (hit) {
    return JSON.parse(hit) as T;
  }

  const value = await fetcher();
  await redis.setEx(key, ttlSeconds, JSON.stringify(value));
  return value;
}
