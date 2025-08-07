import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import invariant from "tiny-invariant";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  invariant(user, "user must be defined");
  const { username } = user;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = async () => {
    await navigate({ to: "/profile" });
    handleClose();
  };

  const handleLogout = async () => {
    logout();
    await navigate({ to: "/" });
    handleClose();
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar
          sx={{
            cursor: "pointer",
          }}
        >
          {username[0]}
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;
