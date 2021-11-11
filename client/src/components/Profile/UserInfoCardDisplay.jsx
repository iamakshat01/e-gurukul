import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { Card } from "@mui/material";
import { Box } from "@mui/system";

const parseDate = (date) => new Date(date).toISOString().split("T")[0];

const UserInfoCardDisplay = (props) => {
  const { personalInfo } = props;

  personalInfo.dob = parseDate(personalInfo.dob);

  return (
    <form autoComplete="off" onSubmit={props.formSubmissionHandler}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="User Details"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="first_name"
                required
                onChange={props.changeHandler}
                value={personalInfo.first_name || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                required
                name="last_name"
                onChange={props.changeHandler}
                value={personalInfo.last_name || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={props.changeHandler}
                value={personalInfo.email || ""}
                variant="outlined"
                type="email"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="mobile"
                onChange={props.changeHandler}
                required
                type="number"
                value={personalInfo.mobile || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                onChange={props.changeHandler}
                value={personalInfo.dob || ""}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default UserInfoCardDisplay;
