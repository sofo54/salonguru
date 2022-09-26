import morgan, { StreamOptions } from 'morgan';
import logger from '../Utils/logger';

const stream: StreamOptions = {
	write: (message: string) => logger.http(message),
};

const loggerMiddleware = morgan(':method :url :status :req[body] :response-time ms', { stream });

export default loggerMiddleware;
