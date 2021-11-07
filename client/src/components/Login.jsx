import React, { useState } from 'react'
import { call, setToken } from '../services/api';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import { Avatar, Typography, Grid, TextField, Button, InputAdornment, autocompleteClasses } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Notification from './Notifications'

const initialValues = {
    'username':'',
    'password':''
}

const useStyles = makeStyles((theme) => ({
    
    root: {
        height: '100vh',
        width: '100%',
    },
    container: {
        position: 'absolute',
        marginTop: theme.spacing(8),
        backgroundColor:'#F8F8FF',
        border: '2px solid white',
        boxShadow: '1px 2px 2px #f0f0f0',
        left: '0', 
        right: '0', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        width: '100px',
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
    Button: {
        fontSize: '200px'
    }
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

        <div className={classes.root}>

            <Container maxWidth="xs" className={classes.container}>

                <CssBaseline />

                <div className={classes.formwrap}>

                    <Avatar sx={{ bgcolor: 'red' }} >
                        <LockIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5" mt={2}>
                        Sign In
                    </Typography>


                    <form className={classes.form} onSubmit={handleSubmit}>


                                <TextField
                                    required
                                    placeholder="Username"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    name="username"
                                    value={values.username}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon/>
                                        </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{ required: false }}
                                />

                                <TextField
                                    required
                                    placeholder="Password"
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon/>
                                        </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{ required: false }}
                                />
                                
                                <Button
                                    variant="contained"
                                    size="large"
                                    margin="normal"
                                    color="primary"
                                    type="submit"
                                    text="Submit"
                                    style={{marginTop: '20px'}}
                                >
                                    Submit
                                </Button>
                    </form>

                </div>

            </Container>

            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
            
        </div>
    )

}