import { logger } from './application/logging.js';
import { app } from './application/web.js';
import http from 'node:http'
import 'dotenv/config.js'

const web = http.createServer(app)
const port = process.env.PORT || 3001

web.listen(port, () => {
    logger.info(`App start on port ${port}`);
});