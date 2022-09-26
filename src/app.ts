/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from 'express';
import routes from './Routes/index.routes';
import { loggerMiddleware, errorHandlerMiddleware } from './Middlewares/index.middleware';
import helmet from 'helmet';

const app: express.Application = express();

// Logger
app.use(loggerMiddleware);

// Allow json and form-data request.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(helmet());

// Use the errorHandlerMiddleware after the routes, otherwise erroHandlerMiddleware will not be triggered.
app.use(errorHandlerMiddleware);

export default app;
