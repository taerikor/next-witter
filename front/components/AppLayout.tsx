import React, { useState } from "react";
import { NextPage } from "next";
import PrimarySearchAppBar from "./AppBar";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../reducer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <PrimarySearchAppBar isLoggedIn={isLoggedIn} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <h2>Left</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          {children}
        </Grid>
        <Grid item xs={12} md={4}>
          <h2>Right</h2>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppLayout;
