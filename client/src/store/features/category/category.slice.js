import { createSlice } from "@reduxjs/toolkit";
import {
  addCategoryThunk,
  deleteCategoryThunk,
  editCategoryThunk,
  getAllCategoriesThunk,
  getCategoryByIdThunk,
} from "./category.thunk";
import toast from "react-hot-toast";

const initialState = {
  screenLoading: false,
  error: null,
  singleCategoryData: null,
  allCategoryData: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (addbuilder) => {
    // Add Category
    addbuilder.addCase(addCategoryThunk.pending, (state, action) => {
      state.screenLoading = false;
      state.error = null;
    });
    addbuilder.addCase(addCategoryThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.singleCategoryData = action.payload?.data;
      toast.success(action.payload?.message);
    });
    addbuilder.addCase(addCategoryThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // Get Category
    addbuilder.addCase(getAllCategoriesThunk.pending, (state, action) => {
      state.screenLoading = false;
      state.error = null;
    });
    addbuilder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.allCategoryData = action.payload?.data;
    });
    addbuilder.addCase(getAllCategoriesThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
    });

    // Delete Category
    addbuilder.addCase(deleteCategoryThunk.pending, (state, action) => {
      state.screenLoading = false;
      state.error = null;
    });
    addbuilder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      toast.success(action.payload?.message);
    });
    addbuilder.addCase(deleteCategoryThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // Find Category by Id
    addbuilder.addCase(getCategoryByIdThunk.pending, (state, action) => {
      state.screenLoading = false;
      state.error = null;
    });
    addbuilder.addCase(getCategoryByIdThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.singleCategoryData = action.payload?.data;
    });
    addbuilder.addCase(getCategoryByIdThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // Edit Category
    addbuilder.addCase(editCategoryThunk.pending, (state, action) => {
      state.screenLoading = false;
      state.error = null;
    });
    addbuilder.addCase(editCategoryThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.singleCategoryData = action.payload?.data;
      toast.success(action.payload?.message)
    });
    addbuilder.addCase(editCategoryThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
