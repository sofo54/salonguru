import HttpException from './http.exception';
import logger from '../Utils/logger';

class DatabaseAddCommentException extends HttpException {
	constructor(errors: any) {
		logger.error('Error occured when trying to add a comment .');
		super(400, 'Error occured when trying to add a comment.', errors);
	}
}

export default DatabaseAddCommentException;
