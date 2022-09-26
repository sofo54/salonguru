import HttpException from './http.exception';
import logger from '../Utils/logger';

class AuthenticationIdentifierFailed extends HttpException {
	/**
	 *
	 * @param identifier
	 */
	constructor(identifier: string) {
		logger.error('Authentication failed, incorect indentifier');
		super(401, `Authentication failed, incorect indentifier : ${identifier}`);
	}
}

export default AuthenticationIdentifierFailed;
