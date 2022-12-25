import mongoose from "mongoose";

//библиотека validator чтобы использовать ее внутри схемы

const userSchema = new mongoose.Schema({
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

export default mongoose.model('user', userSchema);
