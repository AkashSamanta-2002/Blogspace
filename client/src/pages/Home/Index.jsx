import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsThunk } from "../../store/features/blog/blog.thunk";
import BlogCard from "../blog/BlogCard";

const Index = () => {
  const dispatch = useDispatch();

  const { multipleBlogData } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogsThunk());
  }, [dispatch]);

  const blogs = multipleBlogData?.data || [];

  return (
    <div className="min-h-screen bg-base-200 px-6 py-8">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Latest Blogs
          </h1>

          <p className="text-gray-500 mt-1">
            Explore our latest articles and stories.
          </p>
        </div>

        {/* Cards */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No blogs found
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;