import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { call } from "../../services/api";
import UserProfile from "./UserProfile";
import UserInfoCardDisplay from "./UserInfoCardDisplay";
import Notification from "../Utility/Notifications";
import validator from "validator";

// { id, username, role } auth have this here id is user id.
const defaultPersonalInfo = {
  dob: new Date(),
};

const Profile = ({ auth }) => {
  const [userInfo, setUserInfo] = useState({
    personal_info: defaultPersonalInfo,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    call("get", "users/info")
      .then((res) => {
        // console.log(res);
        if (typeof res === "string") {
          res = {};
        }
        if (!res.personal_info) {
          res.personal_info = defaultPersonalInfo;
        }
        setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
        setNotify({
          isOpen: true,
          message: "Could not fetch user details",
          type: "error",
        });
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

    const isValidNumber = validator.isMobilePhone(data.mobile);

    if (!isValidNumber) {
      setNotify({
        isOpen: true,
        message: "The Mobile Number is not valid",
        type: "error",
      });
      return;
    }

    const parsedData = new FormData();
    for (var key in data) {
      parsedData.append(key, data[key]);
    }

    call("put", "users/info", parsedData)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: "Details Updated Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: "The operation was unsuccessfull",
          type: "error",
        });
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
            <UserProfile auth={auth} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <UserInfoCardDisplay
              personalInfo={userInfo.personal_info}
              changeHandler={changeHandler}
              formSubmissionHandler={formSubmissionHandler}
            />
          </Grid>
        </Grid>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
    </Box>
  );
};

export default Profile;
