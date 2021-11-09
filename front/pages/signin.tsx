import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import Link from "next/link";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import AuthLayout from "../components/AuthLayout";
import { NextPage } from "next";
import useInput from "../utils/useInput";

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   background-color: black;
//   width: 500px;
//   height: 600px;
//   border-radius: 10px;
//   padding: 20px;
// `;

const Signin: NextPage = () => {
  const [email, onEmailChange, setEmail] = useInput("");
  const [password, onPasswordChange, setPassword] = useInput("");
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
  return (
    <AuthLayout>
      <Head>
        <title>Nextwitter | Sign In </title>
      </Head>
      <form onSubmit={onSubmit}>
        <h1>계정 정보를 입력해주세요.</h1>
        <TextField
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
        />
        <Link href="/signup">
          <a>아직 계정이 없으신가요?</a>
        </Link>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signin;
