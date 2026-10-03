import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogsByCategoryThunk } from '../../store/features/blog/blog.thunk'
import BlogCard from './BlogCard'

const BlogByCategory = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogsByCategoryThunk(id))
    }, [dispatch, id])

    const {multipleBlogData} = useSelector(state => state.blog)
// console.log(multipleBlogData)

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
        {multipleBlogData?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {multipleBlogData?.data.map((blog) => (
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
  )
}

export default BlogByCategory