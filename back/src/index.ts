import { env } from 'process'
import app from './app.ts';
import { pino } from 'pino';
import { main } from '../requests/relations.ts';

const logger = pino();
main();
const PORT = env.PORT || 3333
const server = app.listen(PORT, () =>
    logger.info(`[server]: Server is running at http://localhost:${PORT}`)
)
