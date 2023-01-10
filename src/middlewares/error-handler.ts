import { NextFunction, Request, Response } from 'express';
import { IErrorWithStatusCode } from '../types';

const errorHandler = (
  err: IErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

export default errorHandler;
