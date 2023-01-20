import express, { json } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { errors } from 'celebrate';
import routes from './routes/index';
import { createUser, login } from './controllers/users';
import errorHandler from './middlewares/error-handler';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { loginValidator, createUserValidator } from './middlewares/validators';
import { limiter } from './utils/constants';

dotenv.config(); // подключаем как мидлвар

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);
const app = express();
app.use(json());

app.use(requestLogger);

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(helmet());

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use(routes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик, подключаем самым последним

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
