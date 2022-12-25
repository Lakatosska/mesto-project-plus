import { Router } from 'express';
import userRoutes from './users';



const routes = Router();

routes.use('/users', userRoutes);

export default routes;