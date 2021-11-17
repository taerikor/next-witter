import { Button, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import useInput from "../utils/useInput";

const CommentForm = () => {
  const [comment, onCommentChange, setComment] = useInput();

  const onTweetSubmit = (e: FormEvent) => {
    e.preventDefault();
    setComment("");
  };
  return (
    <div>
      <form onSubmit={onTweetSubmit}>
        <TextField
          id="outlined-multiline-static"
          placeholder={`What's happening?`}
          multiline
          rows={4}
          value={comment}
          onChange={onCommentChange}
        />
        <>
          <Button type="submit">SEND</Button>
        </>
      </form>
    </div>
  );
};

export default CommentForm;
