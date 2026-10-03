import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCategoryThunk,
  getCategoryByIdThunk,
} from "../../store/features/category/category.thunk";
import slugify from "slugify";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigaet = useNavigate();

  const { id } = useParams();

  const { singleCategoryData: editedCategory } = useSelector(
    (state) => state.category,
  );

  const [category, setCategory] = useState({
    name: "",
    slug: "",
  });

  useEffect(() => {
    dispatch(getCategoryByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (editedCategory) {
      setCategory({
        name: editedCategory.name,
        slug: editedCategory.slug,
      });
    }
  }, [editedCategory]);

  const handleName = (e) => {
    const { value } = e.target;
    const slug = slugify(value, { lower: true });
    setCategory({ name: value, slug });
  };

  const handleEditCategory = async () => {
    const response = await dispatch(editCategoryThunk({ id, ...category }));

    setCategory({ name: "", slug: "" });
    if (response?.payload?.success) {
      navigaet("/category");
    }
  };

  return (
    <div className="min-h-100 flex justify-center mt-10 p-10">
      <div className="border-2 rounded-2xl min-w-200 p-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Edit Category</h1>

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
          className="btn btn-info w-full max-w-sm text-[#fffbfb] font-semibold"
          onClick={handleEditCategory}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
