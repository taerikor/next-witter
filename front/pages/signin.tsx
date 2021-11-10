import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import AuthLayout from "../components/AuthLayout";
import { NextPage } from "next";
import useInput from "../utils/useInput";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/dist/client/router";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  padding: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles({
  input: {
    marginBottom: "10px",
  },
});

const Signin: NextPage = (props) => {
  const [email, onEmailChange, setEmail] = useInput("");
  const [password, onPasswordChange, setPassword] = useInput("");

  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/");
  };
  const classes = useStyles();
  return (
    <AuthLayout>
      <Head>
        <title>Nextwitter | Sign In </title>
      </Head>
      <Form onSubmit={onSubmit}>
        <InputWrapper>
          <h2>계정 정보를 입력해주세요.</h2>
          <TextField
            className={classes.input}
            id="outlined-email-input"
            label="Email"
            autoComplete="current-email"
            type="email"
            name="email"
            value={email}
            onChange={onEmailChange}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            className={classes.input}
          />
          <Link href="/signup">
            <a>아직 계정이 없으신가요?</a>
          </Link>
        </InputWrapper>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default Signin;
