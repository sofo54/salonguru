import { ISalonDocument } from '../../Models/salon.model';
import { Salon, SalonMeta } from '../../Types/salon.types';
import { averageRating } from './salon.func';

export const transformAllSalons = (salons: ISalonDocument[]): Salon[] => {
	const salonArray: Salon[] = [];

	salons.forEach((salon) => salonArray.push(salon));

	return salonArray;
};

export const transformAllMetaSalons = (salons: ISalonDocument[]): SalonMeta[] => {
	const salonArray: SalonMeta[] = [];
	salons.forEach(({ name, address, salon_image, ratings }) => {
		const average: number = averageRating(ratings);
		salonArray.push({ name, address, salon_image, average });
	});
	return salonArray;
};
