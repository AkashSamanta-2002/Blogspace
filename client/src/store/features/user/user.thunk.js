import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../service/axios.js";

export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/signup", {
        name,
        email,
        password,
        avatar
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const googleAuthenticationThunk = createAsyncThunk(
  "user/googleAuthenticationThunk",
  async ({ name, email, avatar }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/google-auth", {
        name,
        email,
        avatar,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "user/logoutUserThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getUserProfileThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateUserProfileThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
