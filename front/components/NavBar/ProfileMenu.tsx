import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../reducer/user";

const ProfileMenu = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logoutAction());
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
