import 'dotenv/config';

function required(key: string, fallback?: string) {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing env var ${key}`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT ?? 8080),
  BASE_URL: required('BASE_URL', 'http://localhost:8080'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  CORS_ORIGIN: required('CORS_ORIGIN', '*'),
  JWT_SECRET: required('JWT_SECRET'),
  DATABASE_URL: required('DATABASE_URL'),
  REDIS_URL: process.env.REDIS_URL,
  SPOTIFY_CLIENT_ID: required('SPOTIFY_CLIENT_ID'),
  SPOTIFY_CLIENT_SECRET: required('SPOTIFY_CLIENT_SECRET'),
  SPOTIFY_REDIRECT_URI: required('SPOTIFY_REDIRECT_URI'),
  DEFAULT_MARKET: process.env.DEFAULT_MARKET ?? 'BE',
};
