import { Router, Request, Response } from 'express';
import salonRouter from './Salon/salon.routes';
import userRouter from './User/user.routes';

const router = Router();

// Endpoint to check server status.
router.get('/health-check', async (req: Request, res: Response) => {
	const healthCheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	};
	try {
		res.send(healthCheck);
	} catch (error: any) {
		healthCheck.message = error;
		res.status(503).send();
	}
});

router.use('/salon', salonRouter);
router.use('/user', userRouter);

export default router;
