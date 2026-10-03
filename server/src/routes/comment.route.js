import { Router } from "express";
import { JWTAuthenticate } from "../middleware/auth.middleware.js";
import { deleteComment, getCommentsByBlog, getCommentsByUser, postComment } from "../controllers/comment.controller.js";

const router = Router();

router.post('/post-comment', JWTAuthenticate, postComment)
router.get('/get-comments/:id', JWTAuthenticate, getCommentsByBlog)
router.get('/get-comments-by-user/:id', JWTAuthenticate, getCommentsByUser)
router.delete('/delete-comment/:id', JWTAuthenticate, deleteComment)

export default router;
