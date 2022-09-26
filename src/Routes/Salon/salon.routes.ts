import { Router } from 'express';
import { getAllSalonsHandler, getMetaSalonsHandler } from '../../Controllers/Salon/salon.controller';

const salonRouter = Router();

// Get all Salons
salonRouter.get('/', getAllSalonsHandler);

// Get all meta informations (name, address, picture)
salonRouter.get('/meta', getMetaSalonsHandler);

export default salonRouter;
