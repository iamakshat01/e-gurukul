import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  username: "akhil",
  role: "Student",
};

export const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.role}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="contained">
        Change Password
      </Button>
    </CardActions>
  </Card>
);
