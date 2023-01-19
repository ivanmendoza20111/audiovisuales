import Joi from '@hapi/joi';

export default {
  storeUser: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    roleId: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    birthday: Joi.date().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }),

  updateUser: Joi.object({
    username: Joi.string().required(),
    roleId: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    birthday: Joi.date().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }),

  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
