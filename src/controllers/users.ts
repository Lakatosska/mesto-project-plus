import { Request, Response } from "express";
import { IRequestCustom } from '../types';
import User from '../models/user';
import { NOTFOUND_ERROR_CODE, DEFAULT_ERROR_CODE, BAD_REQUEST_ERROR_CODE } from "../utils/constants";


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(NOTFOUND_ERROR_CODE).send({ message: 'Пользователь не найден' })
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const {name, about, avatar} = req.body
    if (!name || !about || !avatar) {
      res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Введены некорректные данные' });
      return;
    }
    const newUser = await User.create({name, about, avatar});
    res.status(201).send(newUser);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const updateUser = async (req: IRequestCustom, res: Response) => {
  try {
    const userId = req.user?._id
    const { name, about } = req.body;

    const user = await User?.findByIdAndUpdate(userId, { name, about })
    if (!User) {
      res.status(NOTFOUND_ERROR_CODE).send({ message: 'Такого пользователя не существует' });
      return;
    }

    res.status(201).send(user);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const updateAvatar = async (req: IRequestCustom, res: Response) => {
  try {
    const userId = req.user?._id
    const { avatar } = req.body;

    const newAvatar = await User?.findByIdAndUpdate(userId, { avatar })

    if (!User) {
      res.status(NOTFOUND_ERROR_CODE).send({ message: 'Такого пользователя не существует' });
      return;
    }

    res.status(201).send(newAvatar);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
}
