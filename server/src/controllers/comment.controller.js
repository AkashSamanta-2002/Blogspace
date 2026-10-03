import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";
import { asynchandler } from "../utils/asyncHandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";
import { responsehandler } from "../utils/responseHandler.util.js";

export const postComment = asynchandler(async (req, res, next) => {
  const { blogId, comment } = req.body;
  const userId = req.user?._id;

  if (!blogId || !comment) {
    return next(new errorhandler("All fields are required", 400));
  }

  const newComment = await Comment.create({
    author: userId,
    blog: blogId,
    comment,
  });

  if (!newComment) {
    return next(
      new errorhandler(
        "Something went wrong while submitting comment please try again",
        400,
      ),
    );
  }

  const comments = await Comment.find({ blog: blogId })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });
  if (!comments) {
    return next(new errorhandler("Please reload", 400));
  }

  return res
    .status(201)
    .json(new responsehandler(201, "Comment submitted successfully", comments));
});

export const getCommentsByBlog = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new errorhandler("Blog id is required", 400));
  }

  const comments = await Comment.find({ blog: id })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 });
  if (!comments) {
    return next(
      new errorhandler("Something went wrong while fetching comments", 400),
    );
  }

  return res.status(200).json(new responsehandler(200, "", comments));
});

export const getCommentsByUser = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new errorhandler("User id is required", 400));
  }

  const blogs = await Blog.find({ author: id }, { _id: 1 });

  const comments = await Promise.all(
    blogs.map(async (blog) => {
      return await Comment.find({
        blog: blog._id,
      })
        .sort({ createdAt: -1 })
        .populate("author")
        .populate("blog");
    }),
  );

  // Flatten the arrays
  const allComments = comments.flat();

  if (allComments.length === 0) {
    return next(new errorhandler("No comments found for this user", 404));
  }

  return res
    .status(200)
    .json(
      new responsehandler(200, "Comments fetched successfully", allComments),
    );
});

export const deleteComment = asynchandler(async (req, res, next) => {
  const {id} = req.params;

  if(!id) {
    return next(new errorhandler("Comment id not found", 404));
  }

  const comment = await Comment.deleteOne({_id: id});
  if(!comment?.acknowledged) {
    return next(new errorhandler("Comment deletion failed", 400));
  } 

  return res.json(new responsehandler(200, "Comment deleted successfully"))
})