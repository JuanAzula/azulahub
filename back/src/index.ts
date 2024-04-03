import { env } from 'process'
import app from './app.ts';
import { pino } from 'pino';

const logger = pino();

const PORT = env.PORT || 3333
const server = app.listen(PORT, () =>
    logger.info(`[server]: Server is running at http://localhost:${PORT}`)
)
