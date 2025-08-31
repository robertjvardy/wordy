import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { removeAuthToken } from "../../../module/jwt";
import { useQueryClient } from "@tanstack/react-query";
import { authQueryKeys } from "../../../queries/authQueries";
import type { UserType } from "@repo/types/dtos";

const UserProfile = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    removeAuthToken();
    await queryClient.invalidateQueries({ queryKey: authQueryKeys.init });
    navigate({ to: "/" });
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
