import { styled } from "@mui/material/styles";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import CardImage from "./CardImage";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface IComments {
  User: {
    nickname: string;
  };
  content: string;
}
export interface IImages {
  src: string;
  cols?: number;
  rows?: number;
}

interface PostCardProps {
  post: {
    Comments: IComments[];
    Images: IImages[];
    User: {
      id: number;
      nickname: string;
    };
    content: string;
    id: number;
  };
}

const PostCard: React.FunctionComponent<PostCardProps> = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const onExpandClick = () => {
    setIsOpenComment((prev) => !prev);
  };

  const onLikeClick = () => {
    setIsLike((prev) => !prev);
  };

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post.User.nickname[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.User.nickname}
          subheader="September 14, 2016"
        />
        {/* <CardMedia
          component="img"
          image={post.Images[0]?.src}
          alt="Paella dish"
        /> */}
        <CardImage images={post.Images} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={onLikeClick} aria-label="add to favorites">
            <FavoriteIcon color={isLike ? "warning" : "action"} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={isOpenComment}
            onClick={onExpandClick}
            aria-expanded={isOpenComment}
            aria-label="show more"
          >
            <CommentIcon />
            {post.Comments.length}
          </ExpandMore>
        </CardActions>
        <Collapse in={isOpenComment} timeout="auto" unmountOnExit>
          <CommentForm />
          {post.Comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </Collapse>
      </Card>
    </div>
  );
};

export default PostCard;
