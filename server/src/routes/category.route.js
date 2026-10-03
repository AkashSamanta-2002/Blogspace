import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/category.controller.js";
import { JWTAdminAuthenticate, JWTAuthenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/add-category", JWTAdminAuthenticate, addCategory);
router.put("/edit-category/:id", JWTAdminAuthenticate, editCategory);
router.delete("/delete-category/:id", JWTAdminAuthenticate, deleteCategory);
router.get("/get-category-by-id/:id", JWTAuthenticate, getCategoryById);
router.get("/get-all-categories", getAllCategories);

export default router;
