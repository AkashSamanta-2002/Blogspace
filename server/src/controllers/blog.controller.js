import { asynchandler } from "../utils/asynchandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";
import { responsehandler } from "../utils/responseHandler.util.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";
import { Blog } from "../models/blog.model.js";

export const postBlog = asynchandler(async (req, res, next) => {
  const { title, slug, category, content } = req.body;

  // check fields
  if (!title || !slug || !category || !content) {
    return next(new errorhandler("All fields are required", 400));
  }

  // extract featured image
  const featuredImageLocalPath = req.file?.path;

  // upload on cloudinary
  let featuredImageUrl = "";
  if (featuredImageLocalPath) {
    featuredImageUrl = await uploadOnCloudinary(featuredImageLocalPath);
  }

  // get user
  const user = req.user;
  if (!user) {
    return next(new errorhandler("Invalid token", 400));
  }

  // check existing blog
  const existingBlogCheck = await Blog.findOne({ slug });
  if (existingBlogCheck) {
    return next(new errorhandler("Blog already exists"));
  }

  // upload blog
  const newBlog = await Blog.create({
    title,
    slug,
    category,
    content,
    featured_image: featuredImageUrl
      ? featuredImageUrl
      : "/src/assets/default_blog.png",
    author: user._id,
  });

  if (!newBlog) {
    return next(
      new errorhandler("Something went wrong while uploading blog", 400),
    );
  }

  res
    .status(201)
    .json(new responsehandler(201, "Blog uploaded successfully", newBlog));
});

export const updateBlog = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  // check field
  if (!id) {
    return next(new errorhandler("Blog id is required", 400));
  }

  // get all updation fields
  let { title, slug, category, content } =
    req.body || next(new errorhandler("Updation fields required", 400));
  let featuredImageLocalPath = req.file?.path;

  // check fields
  if (!(title || slug || category || content || featuredImageLocalPath)) {
    return next(new errorhandler("Updation fields are required", 400));
  }

  // get the blog
  const existingBLog = await Blog.findById({ _id: id });

  if (!existingBLog) {
    return next(new errorhandler("Blog does not exist", 400));
  }

  if (!title) {
    title = existingBLog.title;
    slug = existingBLog.slug;
  }

  if (!category) {
    category = existingBLog.category;
  }

  if (!content) {
    content = existingBLog.content;
  }

  let featuredImageUrl;
  if (!featuredImageLocalPath) {
    featuredImageUrl = existingBLog.featured_image;
  } else {
    featuredImageUrl = await uploadOnCloudinary(featuredImageLocalPath);
  }

  // now update the document
  const previousBlog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title,
        slug,
        content,
        category,
        featured_image: featuredImageUrl,
      },
    },
  );

  if (!previousBlog) {
    return next(new errorhandler("Blog updation failed", 400));
  }

  // get the updated blog
  const updatedBlog = await Blog.findById({ _id: id });

  if (!updatedBlog) {
    return next(new errorhandler("Something went wrong when updation", 400));
  }

  // return
  res
    .status(200)
    .json(new responsehandler(200, "Blog updated successfully", updatedBlog));
});

export const deleteBlog = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  // check field
  if (!id) {
    return next(new errorhandler("Blog id is required", 400));
  }

  // delete blog
  const response = await Blog.deleteOne({ _id: id });

  if (!response?.acknowledged) {
    return next(new errorhandler("Blog deletion failed", 400));
  }

  // return
  return res
    .status(200)
    .json(new responsehandler(200, "Blog deleted successfully"));
});

export const getAllBlogs = asynchandler(async (req, res, next) => {
  // get all blogs
  const blogs = await Blog.find({})
    .populate("author")
    .populate("category", "name");

  if (!blogs) {
    return next(new errorhandler("No blog found", 400));
  }

  // return
  return res.status(200).json(new responsehandler(200, "Blogs found", blogs));
});

export const getBlogById = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  // check field
  if (!id) {
    return next(new errorhandler("Blog id is required", 400));
  }

  // get blog by id
  const blog = await Blog.findById({ _id: id }).populate([
    "category",
    "author",
  ]);

  if (!blog) {
    return next(new errorhandler("Blog does not existed", 400));
  }

  return res.status(200).json(new responsehandler(200, "Blog found", blog));
});

export const getBlogByCategoryId = asynchandler(async (req, res, next) => {
  const { categoryId } = req.params;

  // check field
  if (!categoryId) {
    return next(new errorhandler("Category id is required", 400));
  }

  // get blog by id
  const blogs = await Blog.find({ category: categoryId }).populate([
    "author",
    "category",
  ]);

  // if (blogs.length == 0) {
  //   return next(new errorhandler("No blog found", 400));
  // }

  return res.status(200).json(new responsehandler(200, "Blog found", blogs));
});

export const getAllBlogsByUserID = asynchandler(async (req, res, next) => {
  const { userId } = req.params;

  // check field
  if (!userId) {
    return next(new errorhandler("Blog id is required", 400));
  }

  // get the loggedin user
  const loggedInUser = req.user;

  // restrict the user to get blogs
  if (
    !loggedInUser._id.equals(userId) &&
    !loggedInUser.role.includes("admin")
  ) {
    return next(new errorhandler("Access denied", 400));
  }

  // get blog by userId
  const blogs = await Blog.find({ author: userId }).populate([
    "author",
    "category",
  ]);

  if (!blogs) {
    return next(new errorhandler("No Blog exists", 400));
  }

  return res.status(200).json(new responsehandler(200, "Blogs found", blogs));
});

export const getSearchedBlogs = asynchandler(async (req, res, next) => {
  const { q } = req.query;

  // get searched blogs
  const blogs = await Blog.find({
    title: {
      $regex: q,
      $options: "i",
    },
  })
    .populate("author", "name avatar role")
    .populate("category", "name");

  if (blogs.length === 0) {
    return res.status(200).json(new responsehandler(200, "Blogs found", []));
  }

  // return
  return res.status(200).json(new responsehandler(200, "Blogs found", blogs));
});
