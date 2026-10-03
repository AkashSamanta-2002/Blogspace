import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    }
  },
  { timestamps: true },
);

export const Like = mongoose.model("Like", likeSchema);
