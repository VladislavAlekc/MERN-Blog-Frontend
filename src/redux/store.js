import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/posts";
import authSlice from "./slices/auth";
import commentSlice from "./slices/comments";

export const store = configureStore({
  reducer: {
    postsSlice,
    authSlice,
    commentSlice,
  },
});

export default store;
