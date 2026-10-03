import { Like } from "../models/like.model.js";
import { asynchandler } from "../utils/asyncHandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";
import { responsehandler } from "../utils/responseHandler.util.js";

export const postlikeAndDislike = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new errorhandler("Blog id is needed", 400));
  }

  const userId = req.user?._id;

  const check = await Like.find({
    $and: [{ author: userId }, { blog: id }],
  });

  // dislike
  if (check?.length) {
    const dbResponse = await Like.deleteOne({
      $and: [{ blog: id }, { author: userId }],
    });

    if (!dbResponse) {
      return next("Error while dislike, please try again", 400);
    }

    const blogLikes = await Like.find({
      blog: id,
    });

    if (!blogLikes) {
      return next("Please reload the page", 400);
    }

    return res
      .status(201)
      .json(new responsehandler(201, "Disliked", blogLikes));
  } else {  
    // Like
    const dbResponse = await Like.create({
      author: userId,
      blog: id,
    });

    if (!dbResponse) {
      return next("Error while like, please try again", 400);
    }

    const blogLikes = await Like.find({
      blog: id,
    });

    if (!blogLikes) {
      return next("Please reload the page", 400);
    }

    return res.status(201).json(new responsehandler(201, "Liked", blogLikes));
  }
});

export const getLikes = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new errorhandler("Blog id is needed", 400));
  }

  const likes = await Like.find({
    blog: id
  })

  if(!likes) {
    return next(new errorhandler("Error while loading likes", 400))
  }

  return res.status(200).json(new responsehandler(200, "", likes))
});