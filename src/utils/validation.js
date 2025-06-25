import Joi from "joi";

export const loginUserValidation = (data) => {
  const schema = Joi.object({
    login: Joi.string().required().label("login"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};

export const getRoomsValidation = (data) => {
    const schema = Joi.object({
      startDate: Joi.number().optional().label("startDate"),
      lastDate: Joi.number().optional().label("lastDate"),
    });
    return schema.validate(data);
};