import React from "react";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  fetchTags,
  fetchLastComments,
} from "../redux/slices/posts";

function MainPage() {
  const dispatch = useDispatch();
  const { posts, tags, comments } = useSelector((state) => state.postsSlice);
  const fetchUserData = useSelector((state) => state.authSlice.data);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchLastComments());
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
                obj.imageUrl
                  ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                  : ""
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
      <Grid xs={4} item>
        <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        <CommentsBlock isLoading={isCommentsLoading}>
          {comments.items.map((obj, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={obj.user.fullName}
                    sx={{
                      background:
                        "linear-gradient(to right bottom, #ffffffc9, #1a1f1ab8)",
                    }}
                    src="/broken-image.jpg"
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.comment}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </CommentsBlock>
      </Grid>
    </Grid>
  );
}

export default MainPage;
