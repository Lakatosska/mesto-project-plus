import { Request, Response } from "express";
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
      const error = new Error('Нет карточки по заданному id');
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
