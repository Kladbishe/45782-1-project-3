import { Router } from "express";
import { login, register } from "../controllers/auth/controller";
import validation from "../middlewares/validation";
import { loginSchema, registerSchema } from "../controllers/auth/validator";


const router = Router()

router.post("/register",validation(registerSchema), register)


router.post('/login', validation(loginSchema), login)


export default router