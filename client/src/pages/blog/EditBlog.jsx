import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CkEditor from "../../service/components/CkEditor";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../store/features/category/category.thunk";
import {
  getBlogByIdThunk,
  updateBlogThunk,
} from "../../store/features/blog/blog.thunk";
import slugify from "slugify";

const EditBlog = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigaet = useNavigate();

  const [blogData, setBlogData] = useState({
    category: "",
    title: "",
    slug: "",
    featuredImage: "",
    content: "",
  });

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
    dispatch(getBlogByIdThunk(id));
  }, [dispatch, id]);

  const { allCategoryData } = useSelector((state) => state.category);
  const { singleBlogData, screenLoading } = useSelector((state) => state.blog);
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (singleBlogData?.data) {
      setBlogData({
        title: singleBlogData.data.title,
        category: singleBlogData.data.category._id,
        slug: singleBlogData.data.slug,
        featuredImage: singleBlogData.data.featured_image,
        content: singleBlogData.data.content,
      });

      setPreview(singleBlogData.data.featured_image);
    }
  }, [singleBlogData]);

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    setBlogData({ ...blogData, content: data });
  };

  const handleForm = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      setBlogData({
        ...blogData,
        title: value,
        slug: slugify(value, { lower: true }),
      });
    } else {
      setBlogData({ ...blogData, [name]: value });
    }
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBlogData({ ...blogData, featuredImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleBlogUpdate = async () => {
    const response = await dispatch(updateBlogThunk({ id, ...blogData }));
    if (response?.payload?.success) {
      navigaet("/blog");
    }
  };

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
    <div className="p-10">
      <div className="shadow-sm border border-base-300 rounded-2xl p-8 flex flex-col items-center gap-4">
        {/* Category */}
        <div className="w-full">
          <fieldset className="fieldset">
            <label className="label" htmlFor="category">
              <span>Category</span>
            </label>
            <select
              name="category"
              id="category"
              className="input w-full cursor-pointer"
              value={blogData?.category}
              onChange={handleForm}
            >
              {allCategoryData.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        {/* Title */}
        <div className="w-full">
          <fieldset className="fieldset">
            <label className="label" htmlFor="title">
              <span>Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input w-full"
              placeholder="Title"
              value={blogData.title}
              onChange={handleForm}
            />
          </fieldset>
        </div>

        {/* Slug */}
        <div className="w-full">
          <fieldset className="fieldset">
            <label className="label" htmlFor="slug">
              <span>Slug</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              className="input w-full"
              placeholder="cat-des-jfsd"
              value={blogData.slug}
              readOnly
            />
          </fieldset>
        </div>

        {/* Featued Image */}
        <div className="w-full">
          <span className="label mb-1">Featured Image</span>
          <label
            htmlFor="featured-image"
            className="relative w-40 h-40 cursor-pointer group block"
          >
            <img
              src={preview}
              className="w-full h-full rounded-2xl object-cover border border-base-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <FaCamera className="text-white text-3xl" />
            </div>
          </label>

          <input
            type="file"
            id="featured-image"
            accept="image/*"
            className="hidden"
            onChange={handleFeaturedImageChange}
          />
        </div>

        <div>
          <CkEditor
            handleEditorData={handleEditorData}
            initialData={blogData?.content}
            key={id + blogData.content}
          />
        </div>

        <button
          type="submit"
          className="btn btn-info w-full text-[#fffbfb] font-semibold bg-[#422AD5]"
          onClick={handleBlogUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
