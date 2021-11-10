import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { call } from "../services/api";
import { AccountProfile } from "./account-profile";
import UserInfoCardDisplay from "./UserInfoCardDisplay";

// { id, username, role } auth have this here id is user id.

const Profile = ({ auth }) => {
  const [userInfo, setUserInfo] = useState({
    personal_info: {
      dob: new Date(),
    },
  });

  useEffect(() => {
    call("get", "users/info")
      .then((res) => {
        // console.log(res);
        setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (e) => {
    setUserInfo({
      personal_info: {
        ...userInfo.personal_info,
        [e.target.name]: e.target.value,
      },
    });
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    const data = {
      ...userInfo.personal_info,
      user_role: auth.role,
      user_id: auth.id,
    };
    const parsedData = new FormData();
    for (var key in data) {
      parsedData.append(key, data[key]);
    }

    call("put", "users/info", parsedData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4" color="primary">
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <UserInfoCardDisplay
              personalInfo={userInfo.personal_info}
              changeHandler={changeHandler}
              formSubmissionHandler={formSubmissionHandler}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
