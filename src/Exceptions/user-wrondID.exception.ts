import HttpException from './http.exception';
import logger from '../Utils/logger';
import { Types } from 'mongoose';

class UserWrongIDException extends HttpException {
	/**
	 *
	 * @param userID
	 */
	constructor(userID: Types.ObjectId) {
		logger.error('Error, this userID is wrong or doesn\'t exist.');
		super(401, `Error, this userID is wrong or doesn't exist. : ${userID}`);
	}
}

export default UserWrongIDException;
