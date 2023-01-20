import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} from '../controllers/users';
import {
  getUserByIdValidator,
  updateUserValidator,
  updateAvatarValidator,
} from '../middlewares/validators';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserByIdValidator, getUserById);
userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', updateUserValidator, updateUser);
userRoutes.patch('/me/avatar', updateAvatarValidator, updateAvatar);

export default userRoutes;
