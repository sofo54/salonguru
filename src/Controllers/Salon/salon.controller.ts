import { Request, Response, NextFunction } from 'express';
import { Salon, SalonMeta } from '../../Types/salon.types';
import { getAllSalons, getMetaSalons } from '../../Services/Salon/salon.services';

const getAllSalonsHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		const allSalons: Salon[] = await getAllSalons();
		return res.status(200).send(allSalons);
	} catch (error) {
		next(error);
	}
};

const getMetaSalonsHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
	try {
		const metaSalons: SalonMeta[] = await getMetaSalons();
		return res.status(200).send(metaSalons);
	} catch (error) {
		next(error);
	}
};

export { getAllSalonsHandler, getMetaSalonsHandler };
