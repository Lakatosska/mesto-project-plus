import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
}, {
  versionKey: false,
});

export default model<IUser>('user', userSchema);
