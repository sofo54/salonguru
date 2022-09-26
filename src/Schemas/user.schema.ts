import Joi from 'joi';
import { RequestValidateSchema } from '../Types/request-validate-schema.type';

const loginUserSchema: RequestValidateSchema = {
	body: Joi.object().keys({
		identifier: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const addRatingSchema: RequestValidateSchema = {
	body: Joi.object().keys({
		salonID: Joi.string().hex().length(24).required(),
		userID: Joi.string().hex().length(24).required(),
		rating: Joi.number().min(0).max(10).required(),
	}),
};

const updateRatingSchema: RequestValidateSchema = {
	body: Joi.object().keys({
		salonID: Joi.string().hex().length(24).required(),
		customerID: Joi.string().hex().length(24).required(),
		userID: Joi.string().hex().length(24).required(),
		rating: Joi.number().min(0).max(10).required(),
	}),
};

const deleteRatingSchema: RequestValidateSchema = {
	body: Joi.object().keys({
		salonID: Joi.string().hex().length(24).required(),
		customerID: Joi.string().hex().length(24).required(),
		userID: Joi.string().hex().length(24).required(),
	}),
};

const addCommentSchema: RequestValidateSchema = {
	body: Joi.object().keys({
		salonID: Joi.string().hex().length(24).required(),
		customerID: Joi.string().hex().length(24).required(),
		userID: Joi.string().hex().length(24).required(),
		comment: Joi.string().required(),
	}),
};

export { addCommentSchema, deleteRatingSchema, updateRatingSchema, addRatingSchema, loginUserSchema };
