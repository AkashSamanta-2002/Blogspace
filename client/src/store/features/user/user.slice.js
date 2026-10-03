import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileThunk, googleAuthenticationThunk, loginUserThunk, logoutUserThunk, registerUserThunk, updateUserProfileThunk } from "./user.thunk";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  screenLoading: false,
  buttonLoading: false,
  error: null,
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (addBuilder) => {
    // register
    addBuilder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.error = null;
    });
    addBuilder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload.data;
      toast.success(action.payload.message);
    });
    addBuilder.addCase(registerUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // login
    addBuilder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.error = null;
    });
    addBuilder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload?.data;
      toast.success(action.payload.message);
    });
    addBuilder.addCase(loginUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // google authentication
    addBuilder.addCase(googleAuthenticationThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.error = null;
    });
    addBuilder.addCase(googleAuthenticationThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.isAuthenticated = true;
      state.userProfile = action.payload.data;
      toast.success(action.payload.message);
    });
    addBuilder.addCase(googleAuthenticationThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // logout
    addBuilder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
      state.error = null;
    });
    addBuilder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.isAuthenticated = false;
      state.userProfile = null;
      toast.success(action.payload.message);
    });
    addBuilder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    });

    // update profile
    addBuilder.addCase(updateUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.error = null;
    });
    addBuilder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.buttonLoading = false;
      state.userProfile = action.payload?.data;
      toast.success(action.payload?.message)
    });
    addBuilder.addCase(updateUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.buttonLoading = false;
      state.error = action.payload;
      toast.error(action.payload)
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
