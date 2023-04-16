import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCreateComment = createAsyncThunk(
  "comment/fetchCreateComment",
  async ({ postId, comment }) => {
    const { data } = await axios.post(`/comments/${postId}`, {
      postId,
      comment,
    });
    return data;
  }
);

export const fetchGetComment = createAsyncThunk(
  "comment/fetchGetComment",
  async (id) => {
    const { data } = await axios.get(`/posts/comments/${id}`);
    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //Получение комментариев
    [fetchGetComment.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchGetComment.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchGetComment.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    //Создание комментариев
    [fetchCreateComment.pending]: (state) => {
      state.comments.status = "loading";
    },
    [fetchCreateComment.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);

      state.comments.status = "loaded";
    },
    [fetchCreateComment.rejected]: (state) => {
      state.comments.status = "error";
    },
  },
});

export default commentSlice.reducer;
