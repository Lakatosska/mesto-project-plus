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
const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// card
const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegex).required(),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
});

export {
  getUserByIdValidator,
  updateUserValidator,
  updateAvatarValidator,
  loginValidator,
  createUserValidator,
  createCardValidator,
  cardIdValidator,
};
