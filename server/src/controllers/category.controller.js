import { asynchandler } from "../utils/asynchandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";
import { Category } from "../models/category.model.js";
import { responsehandler } from "../utils/responseHandler.util.js";

export const addCategory = asynchandler(async (req, res, next) => {
  const { name, slug } = req.body;

  // check fields
  if (!name || !slug) {
    return next(new errorhandler("All fields are required", 400));
  }

  const existingCategoryCheck = await Category.findOne({ slug });
  if (existingCategoryCheck) {
    return next(new errorhandler("Category already exists", 400));
  }

  // insert in DB
  const newCategory = await Category.create({
    name,
    slug,
  });

  if (!newCategory) {
    return next("Category creation failed try again", 400);
  }

  return res
    .status(201)
    .json(new responsehandler(201, "New Category Added", newCategory));
});

export const editCategory = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, slug } = req.body;

  // check fields
  if (!id || !name || !slug) {
    return next(new errorhandler("All fields are required", 400));
  }

  // update category
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        slug,
      },
    },
  );

  // check updation
  if (!updatedCategory) {
    return next("Updation failed please try again", 400);
  }

  return res
    .status(200)
    .json(new responsehandler(200, "Updation successful", updatedCategory));
});

export const getAllCategories = asynchandler(async (req, res, next) => {
  const allCategories = await Category.find({});

  if (!allCategories) {
    return next(
      "Somthing went wrong while finding all categories try again",
      400,
    );
  }

  return res
    .status(200)
    .json(new responsehandler(200, "All categories found", allCategories));
});

export const getCategoryById = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  // check field
  if (!id) {
    return next(new errorhandler("Category id not found", 400));
  }

  const category = await Category.findById({ _id: id });

  if (!category) {
    return next("Somthing went wrong while finding catagory try again", 400);
  }

  return res
    .status(200)
    .json(new responsehandler(200, "Category found", category));
});

export const deleteCategory = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  // check field
  if (!id) {
    return next(new errorhandler("Deletion failed", 400));
  }

  // delete from DB
  const response = await Category.deleteOne({ _id: id });

  if (!response?.acknowledged) {
    return next(new errorhandler("Category deletion failed", 400));
  }

  return res.status(200).json(new responsehandler(200, "Category deleted"));
});
