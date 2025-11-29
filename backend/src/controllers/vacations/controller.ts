import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacations";


import Like from "../../models/Likes";
import { fn, col } from "sequelize";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const vacations = await Vacation.findAll({
      attributes: {
        include: [[fn("COUNT", col("likes.vacation_id")), "likesCount"]],
      },
      include: [
        {
          model: Like,
          attributes: [],
        },
      ],
      group: ["Vacation.id"],
      order: [["startDate", "ASC"]],
    });

    const result = vacations.map((v) => {
      const json = v.toJSON() as any;
      return {
        ...json,
        imageUrl: json.imageName,
      };
    });

    res.json(result);
  } catch (e) {
    next(e);
  }
}




export async function newVacation(req: Request, res: Response, next: NextFunction) {
  try {
    const { destination, description, startDate, endDate, price } = req.body;

    const vacation = await Vacation.create({
      destination,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      price: Number(price),
      imageName: req.imageName, 
    });

    res.status(201).json(vacation);
  } catch (e) {
    next(e);
  }
}


export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    await Like.destroy({
      where: { vacationId: id }, 
    })

    const deleted = await Vacation.destroy({ where: { id } })
    if (!deleted) {
      return res.status(404).json({ message: "Vacation not found" })
    }

    return res.json({ message: "Vacation deleted", id })
  } catch (e) {
    next(e)
  }
}


export async function updateVacation(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const vacation = await Vacation.findByPk(req.params.id);

    if (!vacation) {
      return res.status(404).json({ message: "Vacation not found" });
    }

    const {
      destination,
      description,
      startDate,
      endDate,
      price,
    } = req.body as {
      destination: string;
      description: string;
      startDate: string | Date;
      endDate: string | Date;
      price: number | string;
    };

    vacation.destination = destination;
    vacation.description = description;
    vacation.startDate = new Date(startDate);
    vacation.endDate = new Date(endDate);
    vacation.price = Number(price);

    if (req.imageName) {
      vacation.imageName = req.imageName;
    }

    await vacation.save();
    return res.json(vacation);
  } catch (e) {
    next(e);
  }
}
