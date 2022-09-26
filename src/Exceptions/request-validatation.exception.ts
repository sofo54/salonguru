import HttpException from './http.exception';
import logger from '../Utils/logger';
class RequestValidationException extends HttpException {
	constructor(errors: Array<string>) {
		logger.error('Request validation failed');
		super(400, 'Request validation failed', errors);
	}
}

export default RequestValidationException;