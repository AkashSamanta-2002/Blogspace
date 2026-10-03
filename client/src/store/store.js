import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../store/features/user/user.slice.js";
import categorySlice from "../store/features/category/category.slice.js";
import blogSlice from "../store/features/blog/blog.slice.js";
import commentSlice from "../store/features/comment/comment.slice.js";
import likeSlice from "../store/features/likes/like.slice.js";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: userSlice,
  category: categorySlice,
  blog: blogSlice,
  comment: commentSlice,
  like: likeSlice,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
