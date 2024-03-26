import { env } from 'process'
import app, { logger } from './server';

const PORT = env.PORT || 3333
const server = app.listen(PORT, () =>
    logger.info(`[server]: Server is running at http://localhost:${PORT}`)
)
