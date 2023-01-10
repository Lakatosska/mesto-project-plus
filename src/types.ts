import { Request } from 'express';
import { Document, Model } from 'mongoose';

export interface IRequestCustom extends Request {
  user?: {
    _id: string,
  }
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
