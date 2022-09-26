import { Router } from 'express';
import {
	addCommentSchema,
	addRatingSchema,
	deleteRatingSchema,
	loginUserSchema,
	updateRatingSchema,
} from '../../Schemas/user.schema';
import { requestValidation, verifyToken } from '../../Middlewares/index.middleware';
import {
	addRatingHandler,
	loginUserHandler,
	updateRatingHandler,
	deleteRatingHandler,
	addCommentHandler,
} from '../../Controllers/User/user.controller';

const userRouter = Router();

// Loggin
userRouter.post('/', requestValidation(loginUserSchema), loginUserHandler);
// Middleware check token
userRouter.use(verifyToken);
// Add a rating
userRouter.post('/rating', requestValidation(addRatingSchema), addRatingHandler);
// Update a rating
userRouter.put('/rating', requestValidation(updateRatingSchema), updateRatingHandler);
// Delete a rating
userRouter.delete('/rating', requestValidation(deleteRatingSchema), deleteRatingHandler);
// Add comment
userRouter.post('/comment', requestValidation(addCommentSchema), addCommentHandler);
export default userRouter;
