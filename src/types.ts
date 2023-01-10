import { Request } from 'express';

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
