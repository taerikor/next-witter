import React from "react";
import { NextPage } from "next";
import PrimarySearchAppBar from "./AppBar";
import { Grid } from "@mui/material";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <PrimarySearchAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <p>Left</p>
        </Grid>
        <Grid item xs={12} md={4}>
          {children}
        </Grid>
        <Grid item xs={12} md={4}>
          <p>right</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppLayout;
