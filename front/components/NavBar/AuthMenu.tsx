import { Button, MenuItem } from "@mui/material";

import Link from "next/link";
import React from "react";

const AuthMenu = ({ displayFlex }) => {
  return (
    <div style={{ display: `${displayFlex ? "flex" : "block"}` }}>
      <MenuItem>
        <Button color="inherit">
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        </Button>
      </MenuItem>
      <MenuItem>
        <Button color="inherit">
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </Button>
      </MenuItem>
    </div>
  );
};

export default AuthMenu;
