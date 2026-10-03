import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getSearchedBlogsThunk } from "../../store/features/blog/blog.thunk";
import BlogCard from "./BlogCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const dispatch = useDispatch();

  useEffect(() => {
  if (!query) return;

  const timer = setTimeout(() => {
    dispatch(getSearchedBlogsThunk(query));
  }, 500);

  return () => clearTimeout(timer);
}, [query, dispatch]);

  const { multipleBlogData } = useSelector((state) => state.blog);

  return (
    <div className="min-h-screen bg-base-200 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Latest Blogs</h1>

          <p className="text-gray-500 mt-1">
            Explore our latest articles and stories.
          </p>
        </div>
        {multipleBlogData?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-base-content">
              No blogs found
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching with a different keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {multipleBlogData?.data?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
