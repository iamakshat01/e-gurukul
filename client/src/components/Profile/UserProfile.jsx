import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { call } from "../../services/api";
import Notification from "../Utility/Notifications";

const ChangePasswordModal = ({ auth }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    if (password.password.toString() !== password.confirmPassword.toString()) {
      setNotify({
        isOpen: true,
        message: "Password do not match",
        type: "error",
      });
      return;
    }
    const data = {
      user_id: auth.id,
      password: password.password.toString(),
    };
    const parsedData = new FormData();
    for (var key in data) {
      parsedData.append(key, data[key]);
    }

    call("put", "users/update_pwd", parsedData)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "Password Updated Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: false,
          message: "Could not update the password",
          type: "error",
        });
      });
  };

  const changeHandler = (e) => {
    setPassword({ ...password, [e.target.name]: [e.target.value] });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        onClick={handleClickOpen}
      >
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Notification notify={notify} setNotify={setNotify} />
        <DialogTitle>Change Password</DialogTitle>
        <form autoComplete="off" onSubmit={formSubmissionHandler}>
          <DialogContent>
            <DialogContentText>
              Please Enter the new Password.
            </DialogContentText>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  onChange={changeHandler}
                  value={password.password}
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  required
                  name="confirmPassword"
                  onChange={changeHandler}
                  value={password.confirmPassword}
                  variant="outlined"
                  type="password"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const UserProfile = ({ auth }) => (
  <Card>
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
          {auth.username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {auth.role}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <ChangePasswordModal auth={auth} />
    </CardActions>
  </Card>
);

export default UserProfile;
