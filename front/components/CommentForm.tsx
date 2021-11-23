import { Button, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer";
import { addCommentReqAction } from "../reducer/post";
import useInput from "../utils/useInput";
interface CommentFormProps {
  postId: string | number;
}
const CommentForm: React.FunctionComponent<CommentFormProps> = ({ postId }) => {
  const [comment, onCommentChange, setComment] = useInput();
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user.user);

  const onTweetSubmit = (e: FormEvent) => {
    e.preventDefault();
    let body = {
      comment,
      postId,
      userId: id,
    };
    dispatch(addCommentReqAction(body));
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
