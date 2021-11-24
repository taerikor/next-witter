import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Progress = () => {
  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "60px",
          height: "60px",
          borderRadius: "7px",
          backgroundColor: "rgba(19, 19, 19, 0.283)",
        }}
      >
        <CircularProgress />
      </Box>
    </Wrapper>
  );
};

export default Progress;
