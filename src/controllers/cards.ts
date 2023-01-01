import { Router, Request, Response } from "express";
import { IRequestCustom } from "../types";
import Card from '../models/card';

// Реализуйте три роута:
// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки


export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
  res.status(200).send(cards);
  } catch (error) {
  res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

//В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.

export const createCard = async (req: IRequestCustom, res: Response) => {
  try {

    const userId = req.user?._id;

  //console.log(req.user._id); // _id станет доступен
  //const { name, link, owner, likes, createdAt } = req.body;
  // const newCard = await Card.create({ name, link });
  const { name, link } = req.body;
  const createdAt = new Date();
  const likes: string[] = [];
  const newCard = await Card.create({
    name,
    link,
    owner: userId,
    likes,
    createdAt,
  })
  res.status(201).send(newCard);

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};


export const deleteCardById = async (req: IRequestCustom, res: Response) => {
  try {
  const userId = req.user?._id;
  const {cardId} = req.params;
  Card.findById(cardId)
    .orFail(new Error('Карточка не найдена'))
    .then((card) => {

      if (card.owner.toString() !== userId) {
        throw new Error;
        res.status(403).send({ message: 'Можно удалять только свои карточки' });
        //403 Forbidden ()
      }

      //return Card.findByIdAndDelete(cardId);
      return Card.deleteOne();  //кажется, что более правильный метод, но выдает ошибку
      //или просто метод Мангуса delete
    })

  res.status(204).send({ message: 'Карточка удалена' });

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }

};

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

// $addToSet, чтобы добавить элемент в массив, если его там ещё нет;
// $pull, чтобы убрать.

export const likeCard = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(

  cardId,
  { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
  { new: true },
  )
}


export const dislikeCard = (req: IRequestCustom, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
  { $pull: { likes: userId } }, // убрать _id из массива
  { new: true },
  )
}
