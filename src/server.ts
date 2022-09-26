/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import app from './app';
import config from './Config/index';
import mongoose from 'mongoose';
import logger from './Utils/logger';

const dbConnect = dataBaseConnection();

dbConnect.on('connected', () => {
	console.log('Mongo Connection Established');
	logger.info('Successfully Connected to the Database');
}).on('reconnected', () => {
	console.log('Mongo Connection Reestablished');
	logger.info('Successfully Reconnected to the Database');
}).on('disconnected', () => {
	console.log('Mongo Connection Disconnected');
	logger.warning('Database Connection Disconnected');
	console.log('Trying to reconnect to Mongo . . .');
	logger.info('Trying to reconnect to Database');
	setTimeout(() => {
		mongoose.connect(config.db_uri!, {
			keepAlive:true, socketTimeoutMS:3000, connectTimeoutMS:3000
		});
	}, 3000);
}).on('close', () => {
	console.log('Mongo Connection Closed');
	logger.info('Database Connection Closed');
}).once('open', () => {
	logger.info('Server is Well Launched');
	listen();
}).on('error', (error: Error) => {
	console.log('Mongo Connection Error: ' + error);
	logger.error('Database Connection Error: ' + error);
});

function dataBaseConnection() {
	const options = {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	mongoose.connect(config.db_uri!, options, () => console.log('Connected to the database.'));
	return mongoose.connection;
}

function listen() {
	app.listen(config.port, () => console.log('Server is running on port == ' + config.port));
}
