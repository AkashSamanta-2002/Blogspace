import { createSlice } from "@reduxjs/toolkit";
import { getLikesThunk, postLikeandDislikeThunk } from "./like.thunk";
import toast from 'react-hot-toast'

const initialState = {
    buttonLoading: false,
    error: null,
    likes: []
}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (addBuilder) => {
        // post like and dislike
        addBuilder.addCase(postLikeandDislikeThunk.pending, (state, action) => {
            state.buttonLoading = true;
            state.error = null;
            state.likes = [];
        })
        addBuilder.addCase(postLikeandDislikeThunk.fulfilled, (state, action) => {
            state.buttonLoading = false;
            state.likes = action.payload?.data;
        })
        addBuilder.addCase(postLikeandDislikeThunk.rejected, (state, action) => {
            state.buttonLoading = false;
            state.error = action.payload;
            toast.error(action.payload?.message);
        })

        // get likes
        addBuilder.addCase(getLikesThunk.pending, (state, action) => {
            state.buttonLoading = true;
            state.error = null;
            state.likes = [];
        })
        addBuilder.addCase(getLikesThunk.fulfilled, (state, action) => {
            state.buttonLoading = false;
            state.likes = action.payload?.data;
        })
        addBuilder.addCase(getLikesThunk.rejected, (state, action) => {
            state.buttonLoading = false;
            state.error = action.payload;
            toast.error(action.payload?.message);
        })
    }
})

export const {} = likeSlice.actions
export default likeSlice.reducer