import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from "../../../service/axios";

export const postLikeandDislikeThunk = createAsyncThunk(
    "like/postLikeandDislike",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`/like/post/${id}`)
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getLikesThunk = createAsyncThunk(
    "like/getLikes",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance(`/like/get-likes/${id}`)
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)