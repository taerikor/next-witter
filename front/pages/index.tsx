import { Avatar, Button, Divider, FormControl, TextField } from "@mui/material";
import type { NextPage } from "next";
import { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import { RootState } from "../reducer";
import { addPostAction } from "../reducer/post";
import useInput from "../utils/useInput";
import styled from "styled-components";
import { Box } from "@mui/system";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
`;

const FormWrapper = styled.form`
  width: 100%;
  border: 1px #66666636 solid;
  padding: 10px 20px;
  margin-top: 10px;
`;

const Home: NextPage = () => {
  const imageInput = useRef<HTMLInputElement>();
  const [tweet, onTweetChange, setTweet] = useInput();

  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state: RootState) => state.post);
  const { user } = useSelector((state: RootState) => state.user);

  const onImageClick = () => {
    imageInput.current.click();
  };

  const onTweetSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addPostAction());
    setTweet("");
  };
  return (
    <AppLayout>
      <FormWrapper onSubmit={onTweetSubmit}>
        <FormControl fullWidth margin="dense">
          <Box
            sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <Avatar
              sx={{ bgcolor: "red", marginRight: "10px" }}
              aria-label="recipe"
            >
              {"U"}
            </Avatar>
            <TextField
              id="input-with-sx"
              placeholder={`What's happening?`}
              multiline
              fullWidth
              value={tweet}
              onChange={onTweetChange}
              variant="standard"
            />
          </Box>
          <ButtonWrapper>
            <input type="file" ref={imageInput} hidden />
            <Button onClick={onImageClick}>Image</Button>
            <Button variant="contained" type="submit">
              SEND
            </Button>
          </ButtonWrapper>
        </FormControl>
      </FormWrapper>
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
