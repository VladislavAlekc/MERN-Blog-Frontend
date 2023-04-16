import React from "react";
import Grid from "@mui/material/Grid";
import { Post } from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPosts } from "../redux/slices/posts";

function PopularPosts() {
  const dispatch = useDispatch();
  const { popularPosts } = useSelector((state) => state.postsSlice);
  const fetchUserData = useSelector((state) => state.authSlice.data);

  const isPostsLoading = fetchPopularPosts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPopularPosts());
  }, []);
  return (
    <Grid container spacing={4}>
      <Grid xs={8} item>
        {(isPostsLoading ? [...Array(5)] : popularPosts.items).map(
          (obj, index) =>
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
                isEditable={fetchUserData?._id === obj.user._id}
              />
            )
        )}
      </Grid>
    </Grid>
  );
}

export default PopularPosts;
