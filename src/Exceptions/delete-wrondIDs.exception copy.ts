import HttpException from './http.exception';
import logger from '../Utils/logger';
import { Types } from 'mongoose';

class UpdateRatingIdsNotMatchException extends HttpException {
	/**
	 *
	 * @param customerID
	 * @param salonID
	 * @param userID
	 */
	constructor(customerID: Types.ObjectId, salonID: Types.ObjectId, userID: Types.ObjectId) {
		logger.error('Error, these IDs doesnt matched.');
		super(
			401,
			`Error, these IDs doesnt matched. customerID : ${customerID} - salondID : ${salonID} - userID : ${userID}`
		);
	}
}

export default UpdateRatingIdsNotMatchException;
