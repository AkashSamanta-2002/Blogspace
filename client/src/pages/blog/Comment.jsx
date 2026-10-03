import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegComments } from "react-icons/fa";
import {
  getComments,
  postComment,
} from "../../store/features/comment/comment.thunk";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const Comment = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleComment = () => {
    dispatch(postComment({ id, comment }));
    setComment('')
  };

  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  const { comments } = useSelector((state) => state.comment);

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-3xl text-blue-700">
          <FaRegComments />
        </span>
        <h1 className="text-2xl font-semibold">Comments</h1>
      </div>
      <span>Comment</span>
      <textarea
        placeholder="Type your comment..."
        value={comment}
        className="textarea textarea-primary w-full"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        className="btn btn-primary text-white font-semibold"
        onClick={handleComment}
      >
        Submit
      </button>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-xl">
          <span>{comments?.length}</span>
          <span>comments</span>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {comments?.map((com) => (
            <div key={com._id}>
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  className="h-11 w-11 rounded-full object-cover border border-gray-200"
                  src={com?.author?.avatar}
                  alt={com?.author?.name || "User avatar"}
                />

                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-sm">
                    {com?.author?.name}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                    <FaCalendarAlt size={13} />
                    <span>{getFormattedDate(com?.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div className="mt-3 ml-14">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {com?.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
