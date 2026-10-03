import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentThunk,
  getCommentsByUserThunk,
} from "../../store/features/comment/comment.thunk";
import { MdDelete } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";

const UserComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = async (commentId) => {
    try {
      await dispatch(deleteCommentThunk(commentId)).unwrap();

      // Reload comments after successful deletion
      dispatch(getCommentsByUserThunk(id));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    dispatch(getCommentsByUserThunk(id));
  }, [dispatch, id]);

  const { comments } = useSelector((state) => state.comment);

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
              User Comments
            </h1>

            <p className="text-sm text-base-content/50 mt-1">
              Manage comments made by this user
            </p>
          </div>

          {/* Comment Count */}
          <div className="flex items-center gap-2 bg-base-100 border border-base-300 rounded-lg px-4 py-2">
            <FaRegCommentDots className="text-primary" />

            <span className="text-sm font-medium">
              {comments?.length || 0} Comments
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Head */}
              <thead>
                <tr className="bg-base-200/70 text-base-content/60 text-xs uppercase tracking-wide">
                  <th className="py-4 px-5">Blog</th>
                  <th>Comment By</th>
                  <th>Date</th>
                  <th>Comment</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {comments?.length > 0 ? (
                  comments.map((comment) => (
                    <tr
                      key={comment?._id}
                      className="hover:bg-base-200/50 transition-colors"
                    >
                      {/* Blog */}
                      <td className="max-w-xs">
                        <div
                          className="font-semibold text-sm line-clamp-2"
                          title={comment?.blog?.title}
                        >
                          {comment?.blog?.title || "Untitled Blog"}
                        </div>
                      </td>

                      {/* Author */}
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <img
                                src={
                                  comment?.author?.avatar ||
                                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                alt={comment?.author?.name}
                              />
                            </div>
                          </div>

                          <span className="text-sm font-medium whitespace-nowrap">
                            {comment?.author?.name || "Unknown"}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="text-sm text-base-content/60 whitespace-nowrap">
                          {comment?.createdAt
                            ? new Date(comment.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "-"}
                        </span>
                      </td>

                      {/* Comment */}
                      <td className="max-w-md">
                        <p
                          className="text-sm text-base-content/70 line-clamp-2"
                          title={comment?.comment}
                        >
                          {comment?.comment || "-"}
                        </p>
                      </td>

                      {/* Action */}
                      <td>
                        <div className="flex justify-center">
                          <button
                            className="
                              btn btn-ghost btn-sm
                              text-error
                              hover:bg-error/10
                              rounded-lg
                            "
                            title="Delete comment"
                            onClick={() => handleDelete(comment?._id)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="flex flex-col items-center justify-center py-16">
                        <FaRegCommentDots
                          size={40}
                          className="text-base-content/20 mb-3"
                        />

                        <p className="font-medium text-base-content/60">
                          No comments found
                        </p>

                        <p className="text-sm text-base-content/40 mt-1">
                          This user hasn't made any comments yet.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
