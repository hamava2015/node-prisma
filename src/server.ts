import app from '../src/index';
import config from './config/config';
import logging from './config/logging';

const NAMESPACE = 'Server';

app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));