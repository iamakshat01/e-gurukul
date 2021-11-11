import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { call } from '../../services/api';
import Notification from '../Utility/Notifications';
import ClassroomProfile from './ClassroomProfile';
import {
    Container,
    Typography,
    Grid
} from '@mui/material';
import ClassroomDetails from './ClassroomDetails';

const ClassroomInfo = ({ auth }) => {
    const { class_id } = useParams();
    const [info, setInfo] = useState({ loading: false, classroom: null });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const fetchInfo = useCallback(() => {
        setInfo({loading: true, classroom: null});
        let path = `${auth.role}/classrooms/${class_id}`;
        call('get', path).then(res => {
            setInfo({ loading: false, classroom: res });
        }).catch(err => {
            setInfo({ loading: false, classroom: [] })
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not load classroom info!', type: 'error' });
            }
        });
    });

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Typography
                    sx={{ m: 3 }}
                    textAlign='center'
                    variant="h4"
                    color='textSecondary'
                >
                    Classroom Information
                </Typography>
                <Grid
                    container
                    spacing={3}
                    alignItems='center'
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <ClassroomProfile info={info} />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <ClassroomDetails info={info} auth={auth} handleUpdate={fetchInfo} />
                    </Grid>
                </Grid>
            </Container>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default ClassroomInfo;