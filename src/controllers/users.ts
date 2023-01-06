import { Request, Response } from 'express';
import { IRequestCustom } from '../types';
import User from '../models/user';
import {
  DEFAULT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
} from '../utils/constants';

export const getUsers = (req: Request, res: Response) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(DEFAULT_ERROR_CODE).send(err.message);
    });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else if (err.message === 'NotValidId') {
        res.status(NOTFOUND_ERROR_CODE).send('Карточка не найдена');
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

export const createUser = (req: Request, res: Response) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

export const updateUser = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else if (err.message === 'NotValidId') {
        res.status(NOTFOUND_ERROR_CODE).send('Карточка не найдена');
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

export const updateAvatar = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else if (err.message === 'NotValidId') {
        res.status(NOTFOUND_ERROR_CODE).send('Карточка не найдена');
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};
