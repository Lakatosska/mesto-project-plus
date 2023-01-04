import { Request, Response } from 'express';
import { IRequestCustom } from '../types';
import Card from '../models/card';
import {
  DEFAULT_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
} from '../utils/constants';

export const getCards = (req: Request, res: Response) => {
  Card.find()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res.status(DEFAULT_ERROR_CODE).send(err.message);
    });
};

export const createCard = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

export const deleteCardById = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new Error('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        res.status(FORBIDDEN_ERROR_CODE).send({ message: 'Можно удалять только свои карточки' });
        return;
      }
      card.deleteOne();
      res.status(204).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      res.status(DEFAULT_ERROR_CODE).send(err.message);
    });
};

export const likeCard = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new Error('Карточка не найдена'))
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      res.status(DEFAULT_ERROR_CODE).send(err.message);
    });
};

export const dislikeCard = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new Error('Карточка не найдена'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(DEFAULT_ERROR_CODE).send(err.message);
    });
};
