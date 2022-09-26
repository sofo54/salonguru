import dotenv from 'dotenv';
dotenv.config();

export default {
	port: process.env.PORT,
	db_uri: process.env.DATABASE_URI,
	jwt_token: process.env.ACCESS_TOKEN_SECRET,
	jwt_refresh_token: process.env.ACCESS_REFRESH_TOKEN_SECRET,
};
