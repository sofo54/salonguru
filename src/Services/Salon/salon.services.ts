import { DatabaseGetAllSalonsException } from '../../Exceptions/index.exception';
import SalonModel, { ISalonDocument } from '../../Models/salon.model';
import { Salon, SalonMeta } from '../../Types/salon.types';
import { transformAllMetaSalons, transformAllSalons } from './salon.transformer';

export const getAllSalons = async (): Promise<Salon[]> => {
	const salons: ISalonDocument[] = await SalonModel.find({});
	if (!salons) throw new DatabaseGetAllSalonsException();
	return transformAllSalons(salons);
};

export const getMetaSalons = async (): Promise<SalonMeta[]> => {
	const salons: ISalonDocument[] | null = await SalonModel.find({});
	if (!salons) throw new DatabaseGetAllSalonsException();
	return transformAllMetaSalons(salons);
};
