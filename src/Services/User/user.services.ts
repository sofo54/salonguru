import {
	AuthenticationIdentifierFailed,
	DeleteRatingIdsNotMatchException,
	SalonWrondIDException,
	UpdateRatingIdsNotMatchException,
	UserAlreadyRatingException,
	UserWrongIDException,
} from '../../Exceptions/index.exception';
import UserModel, { IUserDocument } from '../../Models/user.model';
import {
	AddRatingInput,
	ISession,
	LoggedUser,
	LoginInput,
	UpdateRatingInput,
	DeleteRatingInput,
	AddCommentInput,
} from '../../Types/user.type';
import { transformUserLogged } from './salon.transformer';
import SalonModel, { ISalonDocument } from '../../Models/salon.model';
import { Customer } from '../../Types/salon.types';
import mongoose from 'mongoose';

const login = async (loginInput: LoginInput): Promise<LoggedUser> => {
	const user: IUserDocument | null = await UserModel.findOne({
		identifier: loginInput.identifier,
		password: loginInput.password,
	});
	if (!user) throw new AuthenticationIdentifierFailed(loginInput.identifier);
	const session: ISession = await user.createSession();
	return transformUserLogged(user, session);
};

const addRating = async (addRatingInput: AddRatingInput): Promise<void> => {
	const salonExist: ISalonDocument | null = await SalonModel.findById({ _id: addRatingInput.salonID });
	if (!salonExist) throw new SalonWrondIDException(addRatingInput.salonID);
	const userExist: IUserDocument | null = await UserModel.findById({ _id: addRatingInput.userID });
	if (!userExist) throw new UserWrongIDException(addRatingInput.userID);
	const customer: Customer | undefined = salonExist.customer.find((customer) =>
		customer.userID.equals(addRatingInput.userID)
	);
	if (customer && 'rating' in customer) {
		if (customer.rating !== null && customer.rating !== -1) {
			throw new UserAlreadyRatingException(addRatingInput.userID);
		} else if (customer.rating === -1) {
			customer.rating = addRatingInput.rating;
			salonExist.customer.push(customer);
			salonExist.ratings.push(customer.rating);
			await salonExist.save();
			return;
		}
	}
	const newCustomer: Customer = {
		_id: new mongoose.Types.ObjectId(),
		userID: addRatingInput.userID,
		rating: addRatingInput.rating,
		comments: [''],
	};
	salonExist.customer.push(newCustomer);
	salonExist.ratings.push(newCustomer.rating);
	await salonExist.save();
};

const updateRating = async (updateRatingInput: UpdateRatingInput): Promise<void> => {
	const userExist: IUserDocument | null = await UserModel.findById({ _id: updateRatingInput.userID });
	if (!userExist) throw new UserWrongIDException(updateRatingInput.userID);
	const salonExist: ISalonDocument | null = await SalonModel.findById({ _id: updateRatingInput.salonID });
	if (!salonExist) throw new SalonWrondIDException(updateRatingInput.salonID);
	const customerExist = salonExist.customer.some(
		(customer) => customer._id.equals(updateRatingInput.customerID) && customer.userID.equals(updateRatingInput.userID)
	);
	if (!customerExist)
		throw new UpdateRatingIdsNotMatchException(
			updateRatingInput.customerID,
			updateRatingInput.salonID,
			updateRatingInput.userID
		);
	await salonExist.updateRating(updateRatingInput.customerID, updateRatingInput.rating);
};

const deleteRating = async (deleteRatingInput: DeleteRatingInput): Promise<void> => {
	const userExist: IUserDocument | null = await UserModel.findById({ _id: deleteRatingInput.userID });
	if (!userExist) throw new UserWrongIDException(deleteRatingInput.userID);
	const salonExist: ISalonDocument | null = await SalonModel.findById({ _id: deleteRatingInput.salonID });
	if (!salonExist) throw new SalonWrondIDException(deleteRatingInput.salonID);
	const customerExist = salonExist.customer.some(
		(customer) => customer._id.equals(deleteRatingInput.customerID) && customer.userID.equals(deleteRatingInput.userID)
	);
	if (!customerExist)
		throw new DeleteRatingIdsNotMatchException(
			deleteRatingInput.customerID,
			deleteRatingInput.salonID,
			deleteRatingInput.userID
		);
	await salonExist.deleteRating(deleteRatingInput.customerID);
};

const addComment = async (addCommentInput: AddCommentInput): Promise<void> => {
	const userExist: IUserDocument | null = await UserModel.findById({ _id: addCommentInput.userID });
	if (!userExist) throw new UserWrongIDException(addCommentInput.userID);
	const salonExist: ISalonDocument | null = await SalonModel.findById({ _id: addCommentInput.salonID });
	if (!salonExist) throw new SalonWrondIDException(addCommentInput.salonID);
	const customerExist = salonExist.customer.some(
		(customer) => customer._id.equals(addCommentInput.customerID) && customer.userID.equals(addCommentInput.userID)
	);
	if (!customerExist)
		throw new DeleteRatingIdsNotMatchException(
			addCommentInput.customerID,
			addCommentInput.salonID,
			addCommentInput.userID
		);
	await salonExist.addComment(addCommentInput.customerID, addCommentInput.comment);
};

export { login, addRating, addComment, deleteRating, updateRating };
