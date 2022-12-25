import { createUser, getUserById, getUsers } from '../controllers/users';
import { Request, Response, Router } from "express";
import routes from "routes";
import User from '../models/user';

const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserById);

userRoutes.post('/', createUser);

export default userRoutes;
