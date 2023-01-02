import express, { json, NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { IRequestCustom } from './types';
import routes from './routes/index';

dotenv.config(); // подключаем как мидлвар

const { PORT, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);
const app = express();
app.use(json());

app.use((req: IRequestCustom, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63a8da3ac4773682bc7abb60',
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
