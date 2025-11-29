import { Router } from "express";
import validation from "../middlewares/validation";
import { getAll, newVacation, remove, updateVacation } from "../controllers/vacations/controller";
import { newVacationImageValidator, newVacationValidator, updateVacationValidator } from "../controllers/vacations/validation";
import fileValidation from "../middlewares/file-validator";
import fileUploader from "../middlewares/file-uploder";
import requireAuth from "../middlewares/auth/require-auth";
import adminGuard from "../middlewares/auth/admin-guard";



const router = Router()

router.get("/all", getAll)


router.post("/",requireAuth,adminGuard,fileValidation(newVacationImageValidator),fileUploader,validation(newVacationValidator),newVacation);




router.put("/:id",requireAuth,adminGuard,fileValidation(newVacationImageValidator),fileUploader,validation(updateVacationValidator),updateVacation);




router.delete("/:id",requireAuth,adminGuard,remove);

export default router