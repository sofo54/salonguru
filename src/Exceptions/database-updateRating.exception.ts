import HttpException from './http.exception';
import logger from '../Utils/logger';

class DatabaseUpdateRatingException extends HttpException {
	constructor(errors: any) {
		logger.error('Error occured when trying to update rating.');
		super(400, 'Error occured when trying to update rating.', errors);
	}
}

export default DatabaseUpdateRatingException;
