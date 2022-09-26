/* eslint-disable no-unused-vars */
import { model, Schema, Model, Document, Types } from 'mongoose';
import DatabaseUpdateRatingException from '../Exceptions/database-updateRating.exception';
import DatabaseAddCommentException from '../Exceptions/database-updateRating.exception copy';
import { Customer } from '../Types/salon.types';

// Interface for salon database object.
export interface ISalonDocument extends Document {
	id: Types.ObjectId;
	name: string;
	url: string;
	salon_image: string;
	address: string;
	postal_code: number;
	city: string;
	ratings: [number];
	customer: [
		{
			_id: Types.ObjectId;
			userID: Types.ObjectId;
			comments: [string];
			rating: number;
		}
	];
	createdAt?: Date;
	updateAt?: Date;
	updateRating(customerID: Types.ObjectId, rating: number): Promise<void>;
	deleteRating(customerID: Types.ObjectId): Promise<void>;
	addComment(customerID: Types.ObjectId, comment: string): Promise<void>;
}

// Interface for statics methods.
export type ISalonModel = Model<ISalonDocument>;

// Salon Database Schema.
const SalonSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		salon_image: {
			type: String,
			unique: true,
			required: false,
		},
		address: {
			type: String,
			unique: true,
			required: false,
		},
		postal_code: {
			type: Number,
			unique: false,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		ratings: {
			type: [Number],
			required: true,
		},
		customer: [
			{
				required: false,
				userID: {
					type: Types.ObjectId,
					required: false,
				},
				rating: {
					type: Number,
					required: false,
				},
				comments: {
					type: [String],
					required: false,
				},
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);
// The best way could be to create a model for customer.

SalonSchema.methods.updateRating = async function (customerID: Types.ObjectId, rating: number): Promise<void> {
	try {
		const result: Customer = this.customer.find((obj: Customer) => obj._id.equals(customerID));
		result.rating = rating;
		this.ratings.push(rating);
		await this.save();
	} catch (error: any) {
		throw new DatabaseUpdateRatingException(error);
	}
};

SalonSchema.methods.deleteRating = async function (customerID: Types.ObjectId): Promise<void> {
	try {
		const result: Customer = this.customer.find((obj: Customer) => obj._id.equals(customerID));
		const index = this.ratings.indexOf(result.rating);
		if (index !== -1) {
			this.ratings.splice(index, 1);
		}
		result.rating = -1;
		await this.save();
	} catch (error: any) {
		throw new DatabaseUpdateRatingException(error);
	}
};

SalonSchema.methods.addComment = async function (customerID: Types.ObjectId, comment: string): Promise<void> {
	try {
		const result: Customer = this.customer.find((obj: Customer) => obj._id.equals(customerID));
		result.comments.push(comment);
		await this.save();
	} catch (error) {
		throw new DatabaseAddCommentException(error);
	}
};

const SalonModel: ISalonModel = model<ISalonDocument, ISalonModel>('salons', SalonSchema);

export default SalonModel;
