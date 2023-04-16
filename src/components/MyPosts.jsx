import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "../redux/slices/posts";

export const MyPosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postsSlice);
  const isPostsLoading = posts.status === "loading";
  console.log(posts);
  React.useEffect(() => {
    dispatch(fetchMyPosts());
  }, []);
  return (
    <Grid container spacing={4}>
      <Grid xs={8} item>
        {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments || 0}
              tags={obj.tags}
              children={obj.text}
              isEditable={obj.user}
            />
          )
        )}
      </Grid>
    </Grid>
  );
};
