import { Card, Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const [timer, setTimer] = useState(5);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(timer > 0){
        const timeOut = setTimeout(() => {
                setTimer((timer) => {
                    return --timer;
                });
            }, 1000);
        return (() =>  clearTimeout(timeOut));
        }
        else{
            navigate('/');
        }
    });

    return (
        <Container maxWidth="sm" sx={{display: 'flex', minHeight: '100vh',justifyContent:'center', alignItems: 'center'}}>
            <Card raised sx={{padding: '2rem'}}>
                <Grid container spacing={2}>
                    <Grid item sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} xs={12}>
                        <Typography variant='h4' component='h4' color='error.main' sx={{marginTop: 2}}>
                            Error 404: Page Not Found
                        </Typography>
                        <Box color='warning.main' sx={{my: 2}}>
                            Redirecting in {timer} sec...
                        </Box>
                            <CircularProgress color='warning'/>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default NotFound;