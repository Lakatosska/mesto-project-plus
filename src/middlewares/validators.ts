import { celebrate, Joi } from 'celebrate';
import { urlRegex } from '../utils/constants';

// user

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex).required(),
  }),
});

// auth

// card

export { getUserByIdValidator, updateUserValidator, updateAvatarValidator };
