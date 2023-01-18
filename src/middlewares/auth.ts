import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IRequestAuth } from '../types';
import UnauthorizedError from '../errors/unauthorized-err';

export default (req: IRequestAuth, res: Response, next: NextFunction) => {
  // тут будет вся авторизация
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('Что-то не так с токеном');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next();
};
