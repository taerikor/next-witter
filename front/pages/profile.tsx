import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FollowList from "../components/FollowList";

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>Nextwitte | Profile</title>
      </Head>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel>Search</InputLabel>
        <OutlinedInput
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Grid container>
        <FollowList title="Following" />
        <FollowList title="Follower" />
      </Grid>
    </AppLayout>
  );
};

export default Profile;
