//import { createCard, deleteCardById, dislikeCard, getCards, likeCard } from '../controllers/cards';
import { createCard, deleteCardById, getCards, likeCard, dislikeCard } from '../controllers/cards';
import { Router } from 'express';

const cardRoutes = Router();

cardRoutes.get('/', getCards);

cardRoutes.post('/', createCard);

cardRoutes.delete('/:cardId', deleteCardById);

cardRoutes.put('/:cardId/likes', likeCard);

cardRoutes.delete('/:cardId/likes', dislikeCard);

export default cardRoutes;
