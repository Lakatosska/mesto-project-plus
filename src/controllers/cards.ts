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

  //console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  const newCard = await Card.create({ name, link });
  res.status(201).send(newCard);

  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};


export const deleteCardById = async (req: Request, res: Response) => {
  try {
  const {cardId} = req.params;
  Card.findByIdAndDelete(cardId)
  res.status(204).send({ message: 'Карточка удалена' });

} catch (error) {
  res.status(500).send({ message: 'Ошибка на стороне сервера' });
}

};

