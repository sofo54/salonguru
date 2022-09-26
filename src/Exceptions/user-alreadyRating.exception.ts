import HttpException from './http.exception';
import logger from '../Utils/logger';
import { Types } from 'mongoose';

class UserAlreadyRatingException extends HttpException {
	/**
	 *
	 * @param userID
	 */
	constructor(userID: Types.ObjectId) {
		logger.error('Error, this userID already have rating this salon.');
		super(401, `Error, this userID already have rating this salon. : ${userID}`);
	}
}

export default UserAlreadyRatingException;
