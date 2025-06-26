import Joi from 'joi';

export const loginUserValidation = data => {
	const schema = Joi.object({
		userId: Joi.number().required().label('userId'),
	});
	return schema.validate(data);
};

export const getRoomsValidation = data => {
	const schema = Joi.object({
		userId: Joi.number().optional().label('userId'),
		roomId: Joi.number().optional().label('roomId'),
		startDate: Joi.number().optional().label('startDate'),
		lastDate: Joi.number().optional().label('lastDate'),
	});
	return schema.validate(data);
};

export const declineBookingValidation = data => {
	const schema = Joi.object({
		id: Joi.number().optional().label('id'),
		userId: Joi.number().optional().label('userId'),
	});
	return schema.validate(data);
};
