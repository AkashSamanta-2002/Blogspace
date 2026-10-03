import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../store/features/category/category.thunk";
import { FaCamera } from "react-icons/fa";
import CkEditor from "../../service/components/CkEditor";
import slugify from "slugify";
import { postBlogThunk } from "../../store/features/blog/blog.thunk";
import { useNavigate } from "react-router-dom";
import defaultBlog from "../../assets/default_blog.png";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigaet = useNavigate();

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, []);

  const { allCategoryData } = useSelector((state) => state.category);
  const [blogData, setBlogData] = useState({
    category: "",
    title: "",
    slug: "",
    featuredImage: defaultBlog,
    content: ""
  });
  const [preview, setPreview] = useState();

  const handleFeaturedImageChange = (e) => {
    const file = e.target?.files[0];

    if (file) {
      setBlogData({ ...blogData, featuredImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleEditorData = (event, editor) => {
    const editorData = editor.getData();
    setBlogData({ ...blogData, content: editorData });
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

  const handleBlogSubmit = () => {
    (async () => {
      const response = await dispatch(postBlogThunk(blogData));
      if (response?.payload?.success) {
        navigaet("/blog");
      }
    })();
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
              onChange={handleForm}
            >
              <option value="">--select--</option>
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
          <CkEditor handleEditorData={handleEditorData} />
        </div>

        <button
          type="submit"
          className="btn btn-info w-full text-[#fffbfb] font-semibold bg-[#422AD5]"
          onClick={handleBlogSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
