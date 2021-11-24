import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { Form, InputWrapper } from "./signin";
import { makeStyles } from "@mui/styles";
import useInput from "../utils/useInput";
import { StyledLink } from "../components/PostContent";

const useStyles = makeStyles({
  input: {
    marginBottom: "10px",
  },
});
const Signup = () => {
  const [email, onEmailChange, setEmail] = useInput("");
  const [password, onPasswordChange, setPassword] = useInput("");
  const [name, onNameChange, setName] = useInput("");
  const [confirmPassword, onComfirmPasswordChange, setComfirmPassword] =
    useInput("");
  const [passwordError, setPasswordError] = useState(true);

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <AuthLayout>
      <Head>
        <title>Nextwitter | Sign Up </title>
      </Head>
      <Form onSubmit={onSubmit}>
        <InputWrapper>
          <h2>계정을 생성하세요</h2>
          <TextField
            id="outlined-email-input"
            label="Email"
            autoComplete="current-email"
            type="email"
            value={email}
            onChange={onEmailChange}
            className={classes.input}
          />
          <TextField
            id="outlined-name-input"
            label="Name"
            autoComplete="current-name"
            type="text"
            value={name}
            onChange={onNameChange}
            className={classes.input}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            className={classes.input}
          />
          <TextField
            id="outlined-confirm-password-input"
            label="Confirm Password"
            type="password"
            color={passwordError ? "warning" : "success"}
            value={confirmPassword}
            onChange={onComfirmPasswordChange}
            className={classes.input}
          />
          <Link href="/signin" passHref>
            <StyledLink underline="hover">이미 계정이 있으십니까?</StyledLink>
          </Link>
        </InputWrapper>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Signup;
