import { buildApp } from './app.js';
import { env } from './env.js';
import { logger } from './logger.js';

const app = buildApp();
app.listen(env.PORT, () => {
  logger.info(`API running on http://localhost:${env.PORT}`);
});
