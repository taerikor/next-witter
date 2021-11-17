import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import { RootState } from "../reducer";
import { addPostAction } from "../reducer/post";
import useInput from "../utils/useInput";

const Home: NextPage = () => {
  const imageInput = useRef<HTMLInputElement>();
  const [tweet, onTweetChange, setTweet] = useInput();

  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state: RootState) => state.post);

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
      <form onSubmit={onTweetSubmit}>
        <TextField
          id="outlined-multiline-static"
          placeholder={`What's happening?`}
          multiline
          rows={4}
          value={tweet}
          onChange={onTweetChange}
        />
        <>
          <input type="file" ref={imageInput} hidden />
          <Button onClick={onImageClick}>Image</Button>
          <Button type="submit">SEND</Button>
        </>
      </form>
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
