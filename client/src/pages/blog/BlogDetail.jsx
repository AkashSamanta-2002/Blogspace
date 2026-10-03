import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBlogByIdThunk,
  getReletedBlogsThunk,
} from "../../store/features/blog/blog.thunk";
import { getLikesThunk, postLikeandDislikeThunk } from "../../store/features/likes/like.thunk";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { decode } from "he";
import Comment from "./Comment";
import { FcLike } from "react-icons/fc";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { comments } = useSelector((state) => state.comment);
  const { id } = useParams();

  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogByIdThunk(id));
  }, [id, dispatch]);

  const { singleBlogData: blog } = useSelector((state) => state.blog);

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  useEffect(() => {
    const categoryId = blog?.data?.category?._id;
    if (categoryId) {
      dispatch(getReletedBlogsThunk(categoryId));
    }
  }, [blog?.data?.category?._id, dispatch]);
  const { multipleBlogData } = useSelector((state) => state.blog);
  const reletedBlogs = multipleBlogData?.data;

  const handleLike = () => {
    dispatch(postLikeandDislikeThunk(id))
  }

  useEffect(() => {
    dispatch(getLikesThunk(id));
  }, [id, dispatch]);
  const { likes } = useSelector((state) => state.like);

  const isLiked = likes?.some(
    (like) => like?.author?.toString() === userProfile?._id?.toString(),
  );

  const { screenLoading } = useSelector((state) => state.blog);

  if (screenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-white">
          <span className="loading loading-spinner loading-lg text-info"></span>
          <p className="text-gray-600 font-medium animate-pulse">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex p-5 gap-2 justify-evenly">
      <div className="card bg-base-100 shadow-sm w-180 ml-5">
        <div className="card-body w-full">
          <h1 className="w-full font-bold text-2xl mb-4 text-[#393838]">
            {blog?.data?.title}
          </h1>
          <div className="w-full flex items-center gap-2 justify-between">
            <div className="flex items-center gap-5">
              <span>
                <img
                  className="h-10 w-10 rounded-full object-cover object-center shrink-0"
                  src={blog?.data?.author?.avatar}
                  alt={blog?.data?.author?.name || "user"}
                />
              </span>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {blog?.data?.author?.name}
                </span>
                <span className="flex items-center gap-1">
                  {" "}
                  <span>
                    <FaRegCalendarAlt />
                  </span>{" "}
                  {getFormattedDate(blog?.data?.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1">
                <button onClick={handleLike}>
                  {isLiked ? (
                    <FcLike className={`text-xl cursor-pointer`} />
                  ) : (
                    <CiHeart className={`text-xl cursor-pointer`} />
                  )}
                </button>
                <span>{likes?.length || 0}</span>
              </span>
              <span className="flex items-center gap-1">
                <FaRegComment />
                <span>{comments?.length}</span>
              </span>
            </div>
          </div>
          <img
            src={blog?.data?.featured_image}
            alt="blog img"
            className="w-200 rounded-sm"
          />
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{
              __html: decode(blog?.data?.content || ""),
            }}
          />

          <div className="divider"></div>
          <Comment />
        </div>
      </div>
      <div className="card shadow-sm bg-base-100-500 w-75 pb-10 pl-3 pr-3 pt-2 h-fit">
        <h1 className="text-center mt-5 mb-5 text-2xl font-bold text-[#393838]">
          Releted Blogs
        </h1>
        <div className="flex flex-col gap-3">
          {reletedBlogs.map((reletedBlog) =>
            reletedBlog?._id == blog?.data?._id ? (
              ""
            ) : (
              <button
                onClick={() => navigate(`/blog/${reletedBlog?._id}`)}
                key={reletedBlog?._id}
                className="group flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-base-200"
              >
                <img
                  src={reletedBlog?.featured_image || ""}
                  alt={reletedBlog?.title || "Blog image"}
                  className="w-20 h-20 rounded-md object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {reletedBlog?.title || ""}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">Read article →</p>
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
