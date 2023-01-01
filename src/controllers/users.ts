import { Request, Response } from "express";
import { IRequestCustom } from '../types';
import User from '../models/user';

// Реализуйте три роута:
// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).send(users);
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);

    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFoundError';
      throw error;
    }
    res.status(200).send(user);

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const updateUser = async (req: IRequestCustom, res: Response) => {
  try {
    //req.user._id
    //const newUser = await User.create(req.body);
    //User.findById(req.user._id)
    const { name, about } = req.body;
    const {id} = req.params;
    //const user = await User?.findById(id).update({ name, about })
    //const newUser = user?.update({ name, about })

    const user = User?.findByIdAndUpdate(req.user?._id, { name, about })

    res.status(201).send(user);

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const updateAvatar = async (req: IRequestCustom, res: Response) => {
  try {

    const { avatar } = req.body;
    const {id} = req.params;
    //const newAvatar = await User?.findById(id).updateOne({ avatar })

    const newAvatar = await User?.findByIdAndUpdate(req.user?._id, { avatar })

    res.status(201).send(newAvatar);

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}
