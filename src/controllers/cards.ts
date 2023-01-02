import { Request, Response } from "express";
import { IRequestCustom } from "../types";
import Card from '../models/card';
import { NOTFOUND_ERROR_CODE, DEFAULT_ERROR_CODE, BAD_REQUEST_ERROR_CODE, FORBIDDEN_ERROR_CODE } from "../utils/constants";


export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
};

export const createCard = async (req: IRequestCustom, res: Response) => {
  try {
    const userId = req.user?._id;
    const { name, link } = req.body;

    if (!name || !link ) {
      res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные карточки' });
      return;
    }

    const newCard = await Card.create({
      name,
      link,
      owner: userId,
    })
    res.status(201).send(newCard);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
};

export const deleteCardById = async (req: IRequestCustom, res: Response) => {
  try {
    const userId = req.user?._id;
    const {cardId} = req.params;

    const card = await Card.findById(cardId)

    if (!card) {
      res.status(NOTFOUND_ERROR_CODE).send({ message: 'Такого пользователя не существует' });
      return;
    }

    if (card.owner.toString() !== userId) {
      res.status(FORBIDDEN_ERROR_CODE).send({ message: 'Можно удалять только свои карточки' });
      return
    }

    Card.deleteOne();
    res.status(204).send({ message: 'Карточка удалена' });

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
};

export const likeCard = async (req: IRequestCustom, res: Response) => {

  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )

    if (!card) {
      res.status(NOTFOUND_ERROR_CODE).send({ message: 'Такой карточки не существует' });
        return;
    }

    res.status(201).send(card);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
}

export const dislikeCard = async (req: IRequestCustom, res: Response) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    )

    if (!card) {
      res.status(NOTFOUND_ERROR_CODE).send({ message: 'Такой карточки не существует' });
        return;
    }

    res.status(201).send(card);

  } catch (error) {
    res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
  }
}
