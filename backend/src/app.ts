import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './env.js';
import { apiRateLimiter } from './middlewares/rateLimit.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { health } from './routes/health.js';
import { auth } from './routes/auth.js';
import { spotify } from './routes/spotify.js';
import { favorites } from './routes/favorites.js';
import { snapshots } from './routes/snapshots.js';
import { exportRouter } from './routes/export.js';
import { me } from './routes/me.js';

export function buildApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(morgan('tiny'));
  app.use(apiRateLimiter);

  app.use('/api', health);
  app.use('/api', auth);
  app.use('/api', spotify);
  app.use('/api', favorites);
  app.use('/api', snapshots);
  app.use('/api', exportRouter);
  app.use('/api', me);

  app.use(errorHandler);

  return app;
}
