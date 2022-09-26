import HttpException from './http.exception';
import logger from '../Utils/logger';

class DatabaseGetAllSalonsException extends HttpException {
	/**
	 *
	 * @param void
	 */
	constructor() {
		logger.error('Get all salons database request error');
		super(500, 'Get all salons database request error');
	}
}

export default DatabaseGetAllSalonsException;
