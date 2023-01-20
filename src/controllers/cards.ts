import { NextFunction, Request, Response } from 'express';
import { IRequestCustom } from '../types';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request-err';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

export const createCard = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

export const deleteCardById = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      //  card.owner.equals(req.user._id)
      if (card.owner.toString() !== userId) {
        next(new ForbiddenError('Можно удалять только свои карточки'));
        return;
      }
      card.deleteOne();
      res.status(204).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      next(err);
    });
};

export const likeCard = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

export const dislikeCard = (req: IRequestCustom, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.status(204).send(card);
    })
    .catch((err) => {
      next(err);
    });
};
