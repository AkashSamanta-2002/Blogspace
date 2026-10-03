import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBlogThunk,
  getAllBlogsThunk,
  getBlogByIdThunk,
  getBlogsByCategoryThunk,
  getBlogsByUserIdThunk,
  getReletedBlogsThunk,
  getSearchedBlogsThunk,
  postBlogThunk,
  updateBlogThunk,
} from "./blog.thunk";
import toast from "react-hot-toast";

const initialState = {
  screenLoading: false,
  error: null,
  singleBlogData: null,
  multipleBlogData: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    // post blog
    addBuilder.addCase(postBlogThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(postBlogThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.singleBlogData = action.payload?.data;
      toast.success(action.payload?.message);
    });
    addBuilder.addCase(postBlogThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // get blogs by user id
    addBuilder.addCase(getBlogsByUserIdThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(getBlogsByUserIdThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      // state.singleBlogData = null;
      state.multipleBlogData = action.payload;
    });
    addBuilder.addCase(getBlogsByUserIdThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // delete blog
    addBuilder.addCase(deleteBlogThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(deleteBlogThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      toast.success(action.payload?.message);
    });
    addBuilder.addCase(deleteBlogThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // get blog by id
    addBuilder.addCase(getBlogByIdThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(getBlogByIdThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.singleBlogData = action.payload;
    });
    addBuilder.addCase(getBlogByIdThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // update blog
    addBuilder.addCase(updateBlogThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(updateBlogThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.singleBlogData = action.payload;
      toast.success(action.payload?.message)
    });
    addBuilder.addCase(updateBlogThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // get releted blogs
    addBuilder.addCase(getReletedBlogsThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(getReletedBlogsThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.multipleBlogData = action.payload;
    });
    addBuilder.addCase(getReletedBlogsThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // get all blogs
    addBuilder.addCase(getAllBlogsThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(getAllBlogsThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.multipleBlogData = action.payload;
    });
    addBuilder.addCase(getAllBlogsThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // get blogs by category
    addBuilder.addCase(getBlogsByCategoryThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(getBlogsByCategoryThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.multipleBlogData = action.payload;
    });
    addBuilder.addCase(getBlogsByCategoryThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // get searched blogs
    addBuilder.addCase(getSearchedBlogsThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(getSearchedBlogsThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.multipleBlogData = action.payload;
    });
    addBuilder.addCase(getSearchedBlogsThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      state.multipleBlogData = []
    });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
