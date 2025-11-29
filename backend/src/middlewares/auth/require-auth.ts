import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

const JWT_SECRET = config.get<string>("app.jwtSecret");

export default function requireAuth(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);



    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (e) {
    return res.json(e);
  }
}
