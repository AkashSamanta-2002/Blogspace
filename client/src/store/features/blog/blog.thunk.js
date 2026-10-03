import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../service/axios";

export const postBlogThunk = createAsyncThunk(
  "blog/postBlogThunk",
  async (
    { title, slug, category, content, featuredImage },
    { rejectWithValue },
  ) => {
    console.log(featuredImage)
    try {
      const response = await axiosInstance.post(
        "/blog/post",
        {
          title,
          category,
          slug,
          content,
          "featured-image": featuredImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const getBlogsByUserIdThunk = createAsyncThunk(
  "blog/getBlogsByUserIdThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/blog/get-user-blogs/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const deleteBlogThunk = createAsyncThunk(
  "blog/deleteBlogThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/blog/delete/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const getBlogByIdThunk = createAsyncThunk(
  "blog/getBlogByIdThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/blog/get/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const updateBlogThunk = createAsyncThunk(
  "blog/updateBlogThunk",
  async (
    { title, slug, category, content, featuredImage, id },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        `/blog/update/${id}`,
        {
          title,
          slug,
          category,
          content,
          "featured-image": featuredImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const getReletedBlogsThunk = createAsyncThunk(
  "blog/getReletedBlogsThunk", 
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance(`/blog/get-blogs-by-category/${id}`)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
)

export const getAllBlogsThunk = createAsyncThunk(
  "blog/getAllBlogsThunk",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance(`/blog/get-all-blogs`)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
)

export const getBlogsByCategoryThunk = createAsyncThunk(
  "blog/getBlogsByCategoryThunk",
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance(`/blog/get-blogs-by-category/${id}`)
      console.log(response?.data)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
)

export const getSearchedBlogsThunk = createAsyncThunk(
  "blog/getSearchedBlogsThunk",
  async (q, {rejectWithValue}) => {
    try {
      const response = await axiosInstance(`/blog/search-blogs?q=${q}`)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
)