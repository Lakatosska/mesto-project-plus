import { Request } from "express";
import {Schema} from "mongoose";

export interface IRequestCustom extends Request {
  user?: {
    _id: string;
  }
}

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: IUser;
  likes: String[],
  createdAt : Date,
}
