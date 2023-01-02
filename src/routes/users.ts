import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  updateAvatar
} from '../controllers/users';
import { Router } from "express";

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);

export default userRoutes;
