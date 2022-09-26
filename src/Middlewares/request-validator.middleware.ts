/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { RequestValidationException } from '../Exceptions/index.exception';
import { RequestValidateSchema } from '../Types/request-validate-schema.type';
import logger from '../Utils/logger';

/**
 *
 * @param schema
 * @returns
 */
export const requestValidation = (
	schema: RequestValidateSchema
): ((req: Request, res: Response, next: NextFunction) => void) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (schema.body) {
			const { error } = schema.body.validate(req.body);
			if (error) {
				const errors = error.details.map((detail) => detail.message);
				logger.error(`Request body validation failed : ${errors}`);
				next(new RequestValidationException(errors));
			}
		}
		if (schema.params) {
			const { error } = schema.params.validate(req.params);
			if (error) {
				const errors = error.details.map((detail) => detail.message);
				logger.error(`Request url parameters validation failed : ${errors}`);
				next(new RequestValidationException(errors));
			}
		}
		if (schema.query) {
			const { error } = schema.query.validate(req.query);
			if (error) {
				const errors = error.details.map((detail) => detail.message);
				logger.error(`Request query parameters validation failed : ${errors}`);
				next(new RequestValidationException(errors));
			}
		}
		next();
	};
};
