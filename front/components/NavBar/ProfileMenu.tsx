import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutReqAction } from "../../reducer/user";
import { RootState } from "../../reducer";
import Progress from "../Progress";
import { useRouter } from "next/dist/client/router";

const ProfileMenu = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
  const { logOutLoading, logOutDone } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const onLogoutClick = () => {
    dispatch(logoutReqAction());
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {logOutLoading && <Progress />}
      <MenuItem onClick={handleMenuClose}>
        <Button>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Button>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button onClick={onLogoutClick}>Logout</Button>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
