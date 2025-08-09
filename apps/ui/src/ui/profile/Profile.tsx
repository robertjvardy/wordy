import invariant from "tiny-invariant";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  invariant(user, "User must be defined");

  return (
    <Box>
      <Typography sx={{ mt: "2rem" }} variant="h3">
        Hello {user.username}!
      </Typography>
    </Box>
  );
};

export default Profile;
