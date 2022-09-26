import HttpException from './http.exception';
import logger from '../Utils/logger';

class AuthenticationTokenException extends HttpException {
	/**
	 * 
	 * @param errors 
	 */
	constructor(errors?: Array<string>) {
		logger.error('Authentication failed, bad token');
		super(401, 'Authentication failed, bad token', errors);
	}
}

export default AuthenticationTokenException;
