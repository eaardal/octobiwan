import bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'octobiwan' });
logger.level('debug');

export default logger;