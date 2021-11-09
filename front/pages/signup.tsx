import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { Form, InputWrapper } from "./signin";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  input: {
    marginBottom: "10px",
  },
});
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

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
            name="email"
            value={email}
            onChange={onInputChange}
            className={classes.input}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            type="password"
            color="warning"
            name="password"
            value={password}
            onChange={onInputChange}
            className={classes.input}
          />
          <Link href="/signin">
            <a>이미 계정이 있으십니까?</a>
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
