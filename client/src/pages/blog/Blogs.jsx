import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogThunk,
  getBlogsByUserIdThunk,
} from "../../store/features/blog/blog.thunk";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const Blogs = () => {
  const { userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogsByUserIdThunk(userProfile?._id));
  }, []);

  const { multipleBlogData } = useSelector((state) => state.blog);

  const getFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return formattedDate;
  };

  const handleDelete = async (id) => {
    const confirmation = confirm("Are you sure?");

    if (!confirmation) return;
    const response = await dispatch(deleteBlogThunk(id));

    if (response?.payload?.success) {
      dispatch(getBlogsByUserIdThunk(userProfile?._id));
    }
  };

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
    <div className="p-2">
      <div className="card bg-base-100 shadow-sm rounded-2xl border border-base-300 w-full max-w-6xl mx-auto mt-10 overflow-hidden">
        <div className="card-body">
          <div>
            <NavLink to="/blog/add" className="btn btn-primary btn-block w-fit">
              Add Blog
            </NavLink>
          </div>

          <div className="w-full mt-5 overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xm">
                <tr>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Title</th>
                  <th className="px-6 py-4 text-center">Slug</th>
                  <th className="px-6 py-4 text-center">Dated</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-600">
                {multipleBlogData?.data?.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium">
                      {blog.author?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {blog.category?.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500">{blog.title}</td>

                    <td className="px-6 py-4 text-gray-500">{blog.slug}</td>

                    <td className="px-6 py-4 text-gray-500">
                      {getFormattedDate(blog?.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* Edit */}
                        <button
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
                          title="Edit"
                          onClick={() => navigate(`/blog/edit/${blog?._id}`)}
                        >
                          <FaRegEdit size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer"
                          title="Delete"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <MdDeleteOutline size={20} />
                        </button>

                        {/* View */}
                        <button
                          className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 cursor-pointer"
                          title="View"
                          onClick={() => navigate(`/blog/${blog._id}`)}
                        >
                          <FaRegEye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
