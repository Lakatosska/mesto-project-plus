import { Schema, model } from 'mongoose';
import validator from 'validator';
import { ICard } from '../types';

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Это обязательное поле'],
    ref: 'user',
  },
  likes: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

export default model<ICard>('card', cardSchema);
