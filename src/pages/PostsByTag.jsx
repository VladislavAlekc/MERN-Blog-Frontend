import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByTag } from "../redux/slices/posts";
import { useParams } from "react-router-dom";

export const PostsByTag = () => {
  const dispatch = useDispatch();
  const { tagPosts } = useSelector((state) => state.postsSlice);
  const isPostsLoading = tagPosts.status === "loading";
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(fetchPostsByTag(id));
  }, []);
  return (
    <>
      <h2
        style={{
          fontSize: 40,
          fontWeight: 900,
          color: "black",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        # {id}
      </h2>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : tagPosts.items).map((obj, index) =>
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
    </>
  );
};
