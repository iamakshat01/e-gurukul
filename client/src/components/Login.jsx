import React, { useState } from 'react'
import { call, setToken } from '../services/api';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import { Avatar, Typography, Grid, TextField, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Notification from './Notifications'

const initialValues = {
    'username':'',
    'password':''
}

const useStyles = makeStyles((theme) => ({

    container: {
        marginTop: theme.spacing(8),
        backgroundColor:'white',
        border: '2px solid'
    },
    formwrap: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       width: '100%'
    },
}));

export default function Login(props) {

    const [values,setValues] = useState(initialValues);
    const [notify, setNotify] = useState({ isOpen:false, message:'', type:''});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values,[name]: value})
    }

    const handleSubmit = e => {

        e.preventDefault();
        call('post','auth/login',values).then((data) => {
            setValues(initialValues);
            setToken(data.token);
            setNotify({
                isOpen: true,
                message: 'Signed In Successfully',
                type: 'success'
            })
        }).catch((err)=>{   
            console.log(err);
            setNotify({
                isOpen: true,
                message: 'Sign In Failed',
                type: 'error'
            })
        })
    }

    const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>

            <CssBaseline />

            <div className={classes.formwrap}>

                <Avatar sx={{ bgcolor: 'red' }} variant="square">
                     <LockIcon />
                </Avatar>

                <Typography component="h1" variant="h5" mt={2}>
                    Sign In
                </Typography>


                <form className={classes.form} onSubmit={handleSubmit}>


                            <TextField
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                label="Username"
                                name="username"
                                value={values.username}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                label="Password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                            
                            <Button
                                variant="contained"
                                size="large"
                                margin="normal"
                                color="primary"
                                type="submit"
                                text="Submit"
                            >
                                Submit
                            </Button>
                </form>

            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

        </Container>

    )

}