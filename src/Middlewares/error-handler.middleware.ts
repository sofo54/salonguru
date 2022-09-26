import HttpException from '../Exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';
import logger from '../Utils/logger';
import { ErrorResponse } from '../Types/error-response.type';

export const errorHandlerMiddleware = (
	exception: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
): void => {
	const status = exception.statusCode || 500;
	const message = exception.message || 'Something went wrong';

	let errorResponse: ErrorResponse = {
		status,
		message,
	};
	if (exception.errors) {
		errorResponse = {
			...errorResponse,
			errors: exception.errors,
		};
	}
	logger.error(`${exception.message} : ${exception.errors}`);
	response.status(status).send(errorResponse);
	next();
};
