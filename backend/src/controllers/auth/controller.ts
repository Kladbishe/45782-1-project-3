import { NextFunction, Request, Response } from "express";
import Users from "../../models/Users";
import jwt from "jsonwebtoken"
import { hashPassword, verifyPassword } from "../../utils/password";
import  config  from "config";


const JWT_SECRET = config.get<string>("app.jwtSecret");
const JWT_EXPIRES = "1d";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await Users.findOne({where: { email } });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await hashPassword(password); 

    const user = await Users.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: role ?? "user",
    });

    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    next(e);
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;

     const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }

    
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return res.json({ message: "Invalid email or password" });
    }


    const token = jwt.sign(
      { sub: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });

  }catch(e){
    next(e)
  }
}  