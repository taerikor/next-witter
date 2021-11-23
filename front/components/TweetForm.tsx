import React from "react";
import { Avatar, Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import useInput from "../utils/useInput";
import styled from "styled-components";
import { Box } from "@mui/system";
import { addPostReqAction } from "../reducer/post";

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

const TweetForm = () => {
  const imageInput = useRef<HTMLInputElement>();
  const [tweet, onTweetChange, setTweet] = useInput();

  const dispatch = useDispatch();

  const onImageClick = () => {
    imageInput.current.click();
  };

  const onTweetSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addPostReqAction(tweet));
    setTweet("");
  };
  return (
    <FormWrapper onSubmit={onTweetSubmit}>
      <FormControl fullWidth margin="dense">
        <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
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
  );
};

export default TweetForm;
