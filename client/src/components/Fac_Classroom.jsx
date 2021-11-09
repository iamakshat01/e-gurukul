import { Container, Grid, Typography, Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { call } from '../services/api';
import Notification from './Notifications';
import ClassroomsList from './ClassroomsList';

const Classrooms = ({ auth }) => {
    const [classrooms, setClassrooms] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    useEffect(() => {
        call('get', 'faculty/classrooms/list/active').then(res => {
            setClassrooms(res);
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.message, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not load classrooms!', type: 'error' });
            }
        });
    }, []);
    return (
        <Container maxWidth='lg' sx={{padding: 2}}>
            <Grid container>
                <Grid item xs={12} >
                    <Typography align='center' color='gray' fontWeight='bold' variant='h4' component='h1'>
                        Classrooms
                    </Typography>
                    <Divider />
                </Grid>
            </Grid>
            <ClassroomsList classrooms={classrooms} edit_access='false' />
            <Notification notify={notify} setNotify={setNotify} />
        </Container>
    );
};

export default Classrooms;