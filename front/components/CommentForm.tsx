import { Button, TextField, FormControl, FormGroup } from "@mui/material";
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
          fullWidth
          rows={2}
          value={comment}
          onChange={onCommentChange}
        />
        <div>
          <Button variant="contained" type="submit">
            SEND
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
