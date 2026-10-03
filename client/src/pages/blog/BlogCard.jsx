import { SlCalender } from "react-icons/sl";
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="card-body p-5">

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={blog?.author?.avatar}
            alt={blog?.author?.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-sm">
              {blog?.author?.name}
            </p>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <SlCalender size={12} />
              <span>
                {new Date(blog?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <img
          src={blog?.featured_image}
          alt={blog?.title}
          className="w-full h-48 object-cover rounded-xl mt-3"
        />

        {/* Category */}
        <div className="mt-4">
          <span className="badge badge-primary badge-outline">
            {blog?.category?.name}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mt-2 line-clamp-2">
          {blog?.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {blog?.description}
        </p>

        {/* Read More */}
        <div className="mt-4">
          <button className="btn btn-primary btn-sm" onClick={() => navigate(`/blog/${blog?._id}`)}>
            Read More
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;