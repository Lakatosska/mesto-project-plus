import { createUser, getUserById, getUsers, updateUser, updateAvatar } from '../controllers/users';
import { Request, Response, Router } from "express";
import routes from "routes";
import User from '../models/user';

const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserById);

userRoutes.post('/', createUser);

userRoutes.patch('/me', updateUser);

userRoutes.patch('/me/avatar', updateAvatar);

export default userRoutes;
