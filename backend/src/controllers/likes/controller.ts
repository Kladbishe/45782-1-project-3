import { Request, Response, NextFunction } from "express";
import Like from "../../models/Likes";




export async function addLike(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, vacationId } = req.body;

    await Like.create({ userId, vacationId });
    const count = await Like.count({ where: { vacationId } });
    return res.status(201).json({ message: "Liked", count });
  } catch (e: any) {
    if (e.name === "SequelizeUniqueConstraintError") { //check
      const count = await Like.count({ where: { vacationId: req.body.vacationId } });
      return res.status(200).json({ message: "Already liked", count });
    }
    next(e);
  }
}

export async function removeLike(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, vacationId } = req.body;

    await Like.destroy({ where: { userId, vacationId } });
    const count = await Like.count({ where: { vacationId } });
    return res.json({ message: "Unliked", count });
  } catch (e) {
    next(e);
  }
}


export async function getUserLikes(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const likes = await Like.findAll({ where: { userId }, attributes: ["vacationId"] });
    return res.json({ userId, likedVacations: likes.map(l => l.vacationId) });
  } catch (e) { next(e); }
}