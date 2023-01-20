import express, { json } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { errors } from 'celebrate';
import routes from './routes/index';
import { createUser, login } from './controllers/users';
import errorHandler from './middlewares/error-handler';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { loginValidator, createUserValidator } from './middlewares/validators';

dotenv.config(); // подключаем как мидлвар

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);
const app = express();
app.use(json());

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use(routes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик, подключаем самым последним

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
