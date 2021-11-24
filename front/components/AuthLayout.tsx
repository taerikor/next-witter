import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0e1c48;
`;

const AuthLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AuthLayout;
