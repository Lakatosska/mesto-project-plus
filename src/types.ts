import { Request } from 'express';
import { Document, Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IRequestCustom extends Request {
  user?: {
    _id: string,
  }
}

export interface IRequestAuth extends Request {
  user?: string | JwtPayload,
}

export interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) =>
  Promise<Document<unknown, any, IUser>>
}

export interface ICard {
  name: string,
  link: string,
  owner: IUser,
  likes: String[],
  createdAt : Date,
}

export interface IErrorWithStatusCode {
  statusCode: number,
  message: string,
}
