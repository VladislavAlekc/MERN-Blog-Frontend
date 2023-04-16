import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateComment } from "../../redux/slices/comments";
import { useParams } from "react-router-dom";
import { selectAuth } from "../../redux/slices/auth";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export const Index = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    try {
      const postId = params.id;
      if (comment.length >= 1) {
        dispatch(fetchCreateComment({ postId, comment }));

        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isAuth = useSelector(selectAuth);
  if (!isAuth) {
    <></>;
  } else {
    return (
      <>
        <div className={styles.root}>
          <ListItemAvatar>
            <Avatar src="/broken-image.jpg" />
          </ListItemAvatar>
          <div className={styles.form}>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
            />
            <Button onClick={handleSubmit} variant="contained">
              Отправить
            </Button>
          </div>
        </div>
      </>
    );
  }
};
