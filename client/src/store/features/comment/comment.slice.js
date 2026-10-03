import { createSlice } from "@reduxjs/toolkit";
import { deleteCommentThunk, getComments, getCommentsByUserThunk, postComment } from "./comment.thunk";
import toast from 'react-hot-toast'

const initialState = {
    screenLoading: false,
    error: null,
    comments: []
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (addBuilder) => {
        // post comment
        addBuilder.addCase(postComment.pending, (state, action) => {
            state.screenLoading = true
            state.error = null
            state.comments = null
        })
        addBuilder.addCase(postComment.fulfilled, (state, action) => {
            state.screenLoading = false
            state.comments = action.payload?.data
        })
        addBuilder.addCase(postComment.rejected, (state, action) => {
            state.screenLoading = false
            state.error = action.payload
            toast.error(action.payload?.message)
        })

        // get comments
        addBuilder.addCase(getComments.pending, (state, action) => {
            state.screenLoading = true
            state.error = null
            state.comments = null
        })
        addBuilder.addCase(getComments.fulfilled, (state, action) => {
            state.screenLoading = false
            // console.log(action.payload)
            state.comments = action.payload?.data
        })
        addBuilder.addCase(getComments.rejected, (state, action) => {
            state.screenLoading = false
            state.error = action.payload
            toast.error(action.payload?.message)
        })

        // get comments by user
        addBuilder.addCase(getCommentsByUserThunk.pending, (state, action) => {
            state.screenLoading = true
            state.error = null
            state.comments = null
        })
        addBuilder.addCase(getCommentsByUserThunk.fulfilled, (state, action) => {
            state.screenLoading = false
            // console.log(action.payload)
            state.comments = action.payload?.data
        })
        addBuilder.addCase(getCommentsByUserThunk.rejected, (state, action) => {
            state.screenLoading = false
            state.error = action.payload
        })

        // delete comment
        addBuilder.addCase(deleteCommentThunk.pending, (state, action) => {
            state.screenLoading = true
            state.error = null
            state.comments = null
        })
        addBuilder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
            state.screenLoading = false
            toast.success(action.payload?.message);
        })
        addBuilder.addCase(deleteCommentThunk.rejected, (state, action) => {
            state.screenLoading = false
            state.error = action.payload
            toast.error(action.payload?.message)
        })
    }
})

export const {} = commentSlice.actions
export default commentSlice.reducer