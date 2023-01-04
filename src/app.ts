import express, { json, NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { IRequestCustom } from './types';
import routes from './routes/index';

dotenv.config(); // подключаем как мидлвар

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

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
  console.log(`App listening on port ${PORT}`);
});
