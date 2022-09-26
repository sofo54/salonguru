import HttpException from './http.exception';
import logger from '../Utils/logger';
import { Types } from 'mongoose';

class SalonWrondIDException extends HttpException {
	/**
	 *
	 * @param salonID
	 */
	constructor(salondID: Types.ObjectId) {
		logger.error('Error, this salondID is wrong or doesn\'t exist.');
		super(401, `Error, this salondID is wrong or doesn't exist. : ${salondID}`);
	}
}

export default SalonWrondIDException;
