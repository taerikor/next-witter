import { Avatar, Typography } from "@mui/material";
import React from "react";
import { IComments } from "./PostCard";

interface CommentProps {
  comment: IComments;
}
const Comment: React.FunctionComponent<CommentProps> = ({ comment }) => {
  return (
    <div>
      <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
        {comment.User.nickname[0]}
      </Avatar>
      {comment.User.nickname}
      <Typography>{comment.content}</Typography>
    </div>
  );
};

export default Comment;
