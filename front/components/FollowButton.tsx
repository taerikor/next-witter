import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducer/actionTypes";
import { IPostState } from "../reducer/post";
import { IComments, IImages } from "./PostCard";

interface FollowButtonProps {
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

const FollowButton: React.FunctionComponent<FollowButtonProps> = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const isFollowing = user?.Followings.find((item) => item.id === post.User.id);
  const onFollowClick = () => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  };
  return (
    <IconButton onClick={onFollowClick}>
      <Button>{isFollowing ? "UNFOLLOW" : "FOLLOW"}</Button>
    </IconButton>
  );
};

export default FollowButton;
