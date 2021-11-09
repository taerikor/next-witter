import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import AuthLayout from "../components/AuthLayout";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: black;
  width: 500px;
  height: 600px;
  border-radius: 10px;
  padding: 20px;
`;
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

  return (
    <AuthLayout>
      <Head>
        <title>Nextwitter | Sign Up </title>
      </Head>
      <form onSubmit={onSubmit}>
        <h2>계정을 생성하세요</h2>
        <TextField
          id="outlined-email-input"
          label="Email"
          autoComplete="current-email"
          type="email"
          name="email"
          value={email}
          onChange={onInputChange}
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
        />
        <Link href="/signin">
          <a>이미 계정이 있으십니까?</a>
        </Link>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
