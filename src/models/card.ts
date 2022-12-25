import mongoose, { Schema } from "mongoose";


const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Это обязательное поле'],
  },
  likes: {
    type: Schema.Types.ObjectId, default: [],
  },
  createdAt: {
    type: Date, default: Date.now,
  },

}, {
  versionKey: false,
});

export default mongoose.model('card', cardSchema);