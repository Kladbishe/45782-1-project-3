import { Router } from "express";
import { addLike, getUserLikes, removeLike } from "../controllers/likes/controller";


const router = Router()

router.post('/', addLike)


router.delete("/", removeLike); 
router.get("/:userId", getUserLikes);


export default router