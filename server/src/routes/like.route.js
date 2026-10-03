import { Router } from "express";
import { JWTAuthenticate } from "../middleware/auth.middleware.js";
import { getLikes, postlikeAndDislike } from "../controllers/like.controller.js";

const router = Router();

router.post('/post/:id', JWTAuthenticate, postlikeAndDislike)
router.get('/get-likes/:id', JWTAuthenticate, getLikes)

export default router;
