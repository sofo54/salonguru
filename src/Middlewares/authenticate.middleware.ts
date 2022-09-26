/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../Config';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization;
	if (!req.headers.authorization)
		return res.status(401).send({
			error: {
				message: 'Token {Authorization} is missing.',
			},
		});
	jwt.verify(token!, Config.jwt_token!, (error: any, decode: any) => {
		if (error || decode == null)
			return res.status(401).send({
				error: {
					error: error.message,
					message: 'Token is not valid.',
				},
			});
		if (decode.type === 'Salonguru' && decode.id) {
			next();
		} else
			return res.status(401).send({
				error: {
					message: 'You are not able to use this route.',
				},
			});
	});
}
