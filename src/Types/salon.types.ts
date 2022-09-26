import { Types } from 'mongoose';

export type Salon = {
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
			userID: Types.ObjectId;
			comments: [string];
			rating: number;
		}
	];
};

export type SalonMeta = {
	name: string;
	address: string;
	salon_image: string;
	average: number;
};

export type Customer = {
	_id: Types.ObjectId;
	userID: Types.ObjectId;
	rating: number;
	comments: [string];
};
