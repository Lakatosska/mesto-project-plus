import { Router } from 'express';
import {
  createCard,
  deleteCardById,
  getCards,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  createCardValidator,
  cardIdValidator,
} from '../middlewares/validators';

const cardRoutes = Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCardValidator, createCard);
cardRoutes.delete('/:cardId', cardIdValidator, deleteCardById);
cardRoutes.put('/:cardId/likes', cardIdValidator, likeCard);
cardRoutes.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default cardRoutes;
