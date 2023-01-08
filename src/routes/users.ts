import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);

export default userRoutes;
