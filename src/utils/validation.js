import Joi from 'joi';

export const loginUserValidation = data => {
	const schema = Joi.object({
		userId: Joi.number().required().label('userId'),
	});
	return schema.validate(data);
};

export const getRoomsValidation = data => {
	const {startDate, lastDate} = data;
	const schema = Joi.object({
		userId: Joi.number().optional().label('userId'),
		roomId: Joi.number().optional().label('roomId'),
		startDate: Joi.date().optional().label('startDate'),
		lastDate: Joi.date().greater(Joi.ref('startDate')).optional().label('lastDate'),
	});
	return schema.validate(data);
};

export const declineBookingValidation = data => {
	const schema = Joi.object({
		id: Joi.number().required().label('id'),
		userId: Joi.number().required().label('userId'),
	});
	return schema.validate(data);
};
