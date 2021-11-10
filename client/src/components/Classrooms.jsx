import { Container, Grid, Typography, Divider } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { call } from '../services/api';
import Notification from './Utility/Notifications';
import ClassroomsList from './ClassroomsList';
import ConfirmDialog from './Utility/ConfirmDialog';

const Classrooms = ({ auth, status }) => {
    const [classrooms, setClassrooms] = useState({ loading: false, data: [] });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [current, setCurrent] = useState(null);
    const edit_access = auth.role === 'faculty';
    const onDelete = (classroom) => {
        setCurrent(classroom);
    }

    const handleClose = () => {
        setCurrent(null);
    }

    const handleDelete = useCallback(() => {
        call('delete', `faculty/classrooms/${current._id}`).then(res => {
            setNotify({ isOpen: true, message: 'Classroom deleted successfully', type: 'success' });
            setCurrent(null);
            fetchClassrooms();
        }).catch(err => {
            setCurrent(null);
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.message, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not delete the classroom!', type: 'error' });
            }
        })
    });

    const fetchClassrooms = useCallback(() => {
        let path = `faculty/classrooms/list/${status}`;
        if (auth.role === 'student') {
            path = `student/classrooms/list/${status}`
        }
        setClassrooms({ data: [], loading: true });
        call('get', path).then(res => {
            console.log(res);
            setClassrooms({ loading: false, data: res });
        }).catch(err => {
            setClassrooms({ loading: false, data: [] })
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.message, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not load classrooms!', type: 'error' });
            }
        });
    });
    useEffect(() => {
        fetchClassrooms();
    }, []);

    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <Grid container>
                <Grid item xs={12} >
                    <Typography align='center' color='gray' fontWeight='bold' variant='h4' component='h1'>
                        Classrooms
                    </Typography>
                    <Divider />
                </Grid>
            </Grid>
            <ClassroomsList classrooms={classrooms} onDelete={onDelete} edit_access={true} />
            <Notification notify={notify} setNotify={setNotify} />
            {edit_access ? (<ConfirmDialog onConfirm={handleDelete} onCancel={handleClose} open={Boolean(current)} />) : null}
        </Container>
    );
};

export default Classrooms;