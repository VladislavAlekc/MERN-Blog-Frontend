import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);
export const fetchMyPosts = createAsyncThunk("posts/fetchMyPosts", async () => {
  const { data } = await axios.get("/posts/user/myposts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);
export const fetchLastComments = createAsyncThunk(
  "posts/fetchLastComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);
export const fetchPostsByTag = createAsyncThunk(
  "posts/fetchPostsByTag",
  async (id) => {
    const { data } = await axios.get(`/posts/tags/${id}`);
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  popularPosts: {
    items: [],
    status: "loading",
  },
  tagPosts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //Получение моих статей
    [fetchMyPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchMyPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchMyPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //Получение популярных статей
    [fetchPopularPosts.pending]: (state) => {
      state.popularPosts.items = [];
      state.popularPosts.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.popularPosts.items = action.payload;
      state.popularPosts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.popularPosts.items = [];
      state.popularPosts.status = "error";
    },
    //Получение комментов
    [fetchLastComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchLastComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    //Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //Получение постов по тэгу
    [fetchPostsByTag.pending]: (state) => {
      state.tagPosts.items = [];
      state.tagPosts.status = "loading";
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.tagPosts.items = action.payload;
      state.tagPosts.status = "loaded";
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.tagPosts.items = [];
      state.tagPosts.status = "error";
    },
    //Удаление поста
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export default postsSlice.reducer;
