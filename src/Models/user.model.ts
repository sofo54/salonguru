/* eslint-disable no-unused-vars */
import { model, Schema, Model, Document, Types } from 'mongoose';
import Jwt from 'jsonwebtoken';
import config from '../Config/index';
import { ISession } from '../Types/user.type';

// Interface for user database object.
export interface IUserDocument extends Document {
	id: Types.ObjectId;
	identifier: string;
	password: string;
	comparePassword(password: string): Promise<boolean>;
	createSession(): Promise<ISession>;
}

// Interface for statics methods.
export type IUserModel = Model<IUserDocument>;

// User Database Schema.
const UserSchema: Schema = new Schema(
	{
		identifier: {
			type: String,
			unique: true,
			required: false,
		},
		password: {
			type: String,
			unique: false,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

/**
 *
 * @param password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	const user = this as IUserDocument;
	return user.password === password;
};

/**
 *  @returns {Promise<ISession>}
 */
UserSchema.methods.createSession = async function (): Promise<ISession> {
	return {
		access_token: Jwt.sign(
			{
				id: this.id,
				type: 'Salonguru',
			},
			config.jwt_token!,
			{
				expiresIn: '1h',
			}
		),
	};
};
// old token test :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzA2N2MwMTU1YTQyOTcyYTZiYTJjOSIsInR5cGUiOiJTYWxvbmd1cnUiLCJpYXQiOjE2NjQxMTk1NjksImV4cCI6MTY2NDEyNjc2OX0.3el8NPNpnHohTqQyTVj3E47f2Du_8d5MHiK4YJOZO2E
const UserModel: IUserModel = model<IUserDocument, IUserModel>('users', UserSchema);

export default UserModel;
