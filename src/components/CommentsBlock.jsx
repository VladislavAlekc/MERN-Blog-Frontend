import React, { useEffect } from "react";
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetComment } from "../redux/slices/comments";
import { useParams } from "react-router-dom";

export const CommentsBlock = ({ children }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.commentSlice);

  const isPostsLoading = comments.status === "loading";

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchGetComment(id));
  }, []);

  console.log(comments.items);
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isPostsLoading ? [...Array(5)] : comments.items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isPostsLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    alt={obj.user.fullName}
                    sx={{
                      background:
                        "linear-gradient(to right bottom, #ffffffc9, #1a1f1ab8)",
                    }}
                    src="/broken-image.jpg"
                  />
                )}
              </ListItemAvatar>
              {isPostsLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.comment}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
        {children}
      </List>
    </SideBlock>
  );
};
