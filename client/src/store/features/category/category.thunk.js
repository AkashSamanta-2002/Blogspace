import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../service/axios";

export const addCategoryThunk = createAsyncThunk(
  "category/addCategory",
  async ({ name, slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/category/add-category", {
        name,
        slug,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getAllCategoriesThunk = createAsyncThunk(
  "category/getAllCategoriesThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance("/category/get-all-categories");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteCategoryThunk = createAsyncThunk(
  "category/deleteCategoryThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/category/delete-category/${id}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getCategoryByIdThunk = createAsyncThunk(
  "category/findCategoryByIdThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(
        `/category/get-category-by-id/${id}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const editCategoryThunk = createAsyncThunk(
  "category/updateCategoryThunk",
  async ({ id, name, slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/category/edit-category/${id}`,
        { name, slug },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
