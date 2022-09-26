import winston from 'winston';

const levels = {
	error:0,
	warning:1,
	info:2,
	http:3,
	debug:4
};

const folderPath = 'Logs';
const level =  'debug';

const colors = {
	error: 'red',
	warning: 'yellow',
	info: 'green',
	http:'blue',
	debug: 'gray'
};

winston.addColors(colors);

const format = winston.format.combine(
	winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms'}),
	winston.format.printf((info: winston.Logform.TransformableInfo) => `${info.timestamp} [${info.level}] ${info.message}`)
);

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(winston.format.colorize({all:true}))
	}),
	new winston.transports.File({
		filename: `${folderPath}/error.log`,
		level:'error',
	}),
	new winston.transports.File({ filename: `${folderPath}/app.log`}),
];

const logger = winston.createLogger({
	level:level,
	levels,
	format,
	transports,
});

export default logger;
