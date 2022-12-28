import { createCard, deleteCardById, getCards } from '../controllers/cards';
import { Router } from 'express';

const cardRoutes = Router();

cardRoutes.get('/', getCards);

cardRoutes.post('/', createCard);

cardRoutes.delete('/:cardId', deleteCardById);

export default cardRoutes;
