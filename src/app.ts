import express, { Router, json } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import User from './models/user';
//import { Router } from 'express';
import routes from './routes/index';

dotenv.config(); // подключаем как мидлвар

const { PORT, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env; // переменная PORT, которая деструктурируется из объекта process.env
console.log(PORT, MONGO_URL)

//mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
mongoose.connect(MONGO_URL)

const app = express();

app.use(json());

app.use(routes);







// mongoose.connect(MONGO_URL)
//   .then(() => console.log('Connected successfully to mestodb'))
//   .catch((err) => console.error(err.message));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})

// mongodb://localhost:27017/mestodb
