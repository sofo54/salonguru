import { Types } from 'mongoose';

export type LoggedUser = {
	userID: Types.ObjectId;
	identifier: string;
	session: ISession;
};

export type LoginInput = {
	identifier: string;
	password: string;
};

export type ISession = {
	access_token: string;
};

export type AddRatingInput = {
	salonID: Types.ObjectId;
	userID: Types.ObjectId;
	rating: number;
};

export type UpdateRatingInput = {
	salonID: Types.ObjectId;
	userID: Types.ObjectId;
	customerID: Types.ObjectId;
	rating: number;
};

export type DeleteRatingInput = {
	salonID: Types.ObjectId;
	userID: Types.ObjectId;
	customerID: Types.ObjectId;
	rating: number;
};

export type AddCommentInput = {
	salonID: Types.ObjectId;
	userID: Types.ObjectId;
	customerID: Types.ObjectId;
	comment: string;
};
