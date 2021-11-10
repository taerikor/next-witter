import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import React from "react";
function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

interface FollowListProps {
  title: string;
}

const FollowList: React.FunctionComponent<FollowListProps> = ({ title }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        {title}
      </Typography>
      <Demo>
        <List>
          {generate(
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <HighlightOffIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                // secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem>
          )}
          <Button>Load More</Button>
        </List>
      </Demo>
    </Grid>
  );
};

export default FollowList;
