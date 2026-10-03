import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { addCategoryThunk } from "../../store/features/category/category.thunk";
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigaet = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    slug: "",
  });

  const handleName = (e) => {
    const { value } = e.target;
    const slug = slugify(value, { lower: true });
    setCategory({ name: value, slug });
  };

  const handleAddCategory = async () => {
    const response = await dispatch(addCategoryThunk(category));
    setCategory({ name: "", slug: "" });
    if(response?.payload?.success) {
      navigaet("/category")
    }
  };

  return (
    <div className="min-h-100 flex justify-center mt-10 p-10">
      <div className="border-2 rounded-2xl min-w-200 p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Add Category</h1>

        {/* Name */}
        <div className="w-full max-w-sm">
          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              <span>Category Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input w-full"
              placeholder="Name"
              value={category.name}
              onChange={handleName}
            />
          </fieldset>
        </div>

        {/* Slug */}
        <div className="w-full max-w-sm">
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
              value={category.slug}
              readOnly
            />
          </fieldset>
        </div>

        <button
          type="submit"
          className="btn btn-info w-full max-w-sm text-[#fffbfb] font-semibold bg-[#422ad5]"
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
