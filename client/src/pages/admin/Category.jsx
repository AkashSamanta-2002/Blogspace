import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteCategoryThunk,
  getAllCategoriesThunk,
} from "../../store/features/category/category.thunk";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Category = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      dispatch(getAllCategoriesThunk());
    })();
  }, []);

  const { allCategoryData } = useSelector((state) => state.category);

  const handleDelete = async (id) => {
    const confirmation = confirm("Are you sure...");
    if(!confirmation) return;

    const response = await dispatch(deleteCategoryThunk(id));
    if (response?.payload?.success) {
      dispatch(getAllCategoriesThunk());
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-category/${id}`)
  };

  return (
    <div className="p-5">
      <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-300 w-full max-w-6xl mx-auto mt-10 overflow-hidden">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-[#464444] m-auto">
            All Categories
          </h1>
          <div className="mt-6">
            <NavLink
              to="/add-category"
              className="btn btn-primary btn-block w-fit"
            >
              Add Category
            </NavLink>
          </div>

          <div className="w-full mt-10 overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-600">
                {allCategoryData.map((category) => (
                  <tr
                    key={category._id}
                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium">{category.name}</td>

                    <td className="px-6 py-4 text-gray-500">{category.slug}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-4 text-xl">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                          onClick={() => handleEdit(category._id)}
                        >
                          <FaRegEdit />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-800 transition cursor-pointer"
                          title="Delete"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          <MdDelete />
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

export default Category;
