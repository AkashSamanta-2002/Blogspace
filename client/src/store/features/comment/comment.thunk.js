import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../service/axios";

export const postComment = createAsyncThunk(
  "comment/postComment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/comment/post-comment", {
        blogId: id,
        comment,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(`/comment/get-comments/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getCommentsByUserThunk = createAsyncThunk(
  "comment/getCommentsByUserThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance(
        `/comment/get-comments-by-user/${id}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const deleteCommentThunk = createAsyncThunk(
  "comment/deleteCommentThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/comment/delete-comment/${id}`,
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
