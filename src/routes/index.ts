import { Router } from 'express';
import userRoutes from './users';
import cardRoutes from './cards';


const routes = Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

export default routes;
