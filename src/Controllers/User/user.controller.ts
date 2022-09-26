import { Request, Response, NextFunction } from 'express';
import { addComment, addRating, deleteRating, login, updateRating } from '../../Services/User/user.services';
import { LoggedUser } from '../../Types/user.type';

const loginUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		const userLogin: LoggedUser = await login(req.body);
		return res.status(200).send(userLogin);
	} catch (error) {
		next(error);
	}
};

const addRatingHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		await addRating(req.body);
		return res.status(201).send('Your rating has been well added.');
	} catch (error) {
		next(error);
	}
};

const updateRatingHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		await updateRating(req.body);
		return res.status(200).send('The update has been well done.');
	} catch (error) {
		next(error);
	}
};

const deleteRatingHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		await deleteRating(req.body);
		return res.status(200).send('The delete has been well done.');
	} catch (error) {
		next(error);
	}
};

const addCommentHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		await addComment(req.body);
		return res.status(200).send('The comment has been well post.');
	} catch (error) {
		next(error);
	}
};

export { updateRatingHandler, loginUserHandler, addRatingHandler, deleteRatingHandler, addCommentHandler };
