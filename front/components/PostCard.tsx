import { styled } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  List,
  Menu,
  MenuItem,
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

import styledComp from "styled-components";
import PostContent from "./PostContent";
import { useDispatch, useSelector } from "react-redux";
import { removePostReqAction } from "../reducer/post";
import { RootState } from "../reducer";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardWrapper = styledComp.div`
  margin: 10px 0;
`;

export interface IComments {
  User: {
    nickname: string;
  };
  content: string;
}
export interface IImages {
  src: string;
}

interface PostCardProps {
  post: {
    Comments: IComments[];
    Images: IImages[];
    User: {
      id: number | string;
      nickname: string;
    };
    content: string;
    id: number | string;
  };
}

const PostCard: React.FunctionComponent<PostCardProps> = ({ post }) => {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);

  const userId = useSelector((state: RootState) => state.user?.user?.id);

  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(moreAnchorEl);

  const handleMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const MenuId = "primary-search-account-menu";

  const onExpandClick = () => {
    setIsOpenComment((prev) => !prev);
  };

  const onLikeClick = () => {
    setIsLike((prev) => !prev);
  };

  const onDeleteClick = () => {
    dispatch(removePostReqAction(post.id));
  };

  const renderMenu = (
    <Menu
      anchorEl={moreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={MenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userId === post.User.id && (
        <MenuItem>
          <Button color="inherit" onClick={onDeleteClick}>
            Delete
          </Button>
        </MenuItem>
      )}
      <MenuItem>
        <Button color="inherit">Report</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <CardWrapper>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post.User.nickname[0]}
            </Avatar>
          }
          action={
            <IconButton
              size="medium"
              aria-label="show more"
              aria-controls={MenuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.User.nickname}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <PostContent content={post.content} />
          </Typography>
        </CardContent>
        {post.Images[0] && <CardImage images={post.Images} />}
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
          <CommentForm postId={post.id} />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {post.Comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </List>
        </Collapse>
      </Card>
      {renderMenu}
    </CardWrapper>
  );
};

export default PostCard;
