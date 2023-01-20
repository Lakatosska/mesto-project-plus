import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IRequestCustom } from '../types';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';
import NotFoundError from '../errors/not-found-err';
import ConflictError from '../errors/conflict-err';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

export const getCurrentUser = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};
