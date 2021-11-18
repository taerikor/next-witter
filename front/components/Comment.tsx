import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { IComments } from "./PostCard";

interface CommentProps {
  comment: IComments;
}
const Comment: React.FunctionComponent<CommentProps> = ({ comment }) => {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {comment.User.nickname[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.User.nickname}
          secondary={<React.Fragment>{comment.content}</React.Fragment>}
        />
      </ListItem>
      <Divider variant="inset" />
    </div>
  );
};

export default Comment;
