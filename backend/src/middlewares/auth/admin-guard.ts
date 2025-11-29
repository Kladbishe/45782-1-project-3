import type { Response, NextFunction } from "express";

export default function adminGuard(req: any, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  next();
}
