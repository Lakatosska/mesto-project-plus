import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import { IUser, IUserModel } from '../types';
import UnauthorizedError from '../errors/unauthorized-err';
import { urlRegex } from '../utils/constants';

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Превышена максимальная длина в 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [200, 'Превышена максимальная длина в 200 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => urlRegex.test(value),
      message: 'Некорректная ссылка',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Некорректный e-mail',
    },
  },
  password: {
    type: String,
    required: [true, 'Это обязательное поле'],
    // хеш пароля не будет возвращаться из базы (по умолчанию)
    select: false,
  },
}, {
  versionKey: false,
});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
});

export default model<IUser, IUserModel>('user', userSchema);
