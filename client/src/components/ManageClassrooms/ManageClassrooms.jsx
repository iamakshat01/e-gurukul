import { Container, Grid, Card, CardHeader, Avatar, Divider, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Classrooms from '../Classrooms';
import { call } from '../../services/api';
import pickColor from '../../services/colorPicker';
import Notification from '../Utility/Notifications';
import CreateClassroom from './ClassroomFormModal';
import CardSkeleton from '../Utility/CardSkeleton';

const FacultyInfo = ({ faculty }) => {
    if (faculty.loading || !faculty.faculty) {
        return (
            <CardSkeleton />);
    }
    else {
        return (
            <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} raised>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: pickColor(faculty.faculty._id) }} aria-label="recipe">
                            {String(faculty.faculty.faculty_code).toUpperCase()[0]}
                        </Avatar>
                    }
                    title={faculty.faculty.personal_info.first_name}
                    titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                    subheader={faculty.faculty.faculty_code}
                    subheaderTypographyProps={{ variant: 'h6' }}
                />
            </Card>
        );
    }
}

const ManageClassrooms = ({ auth }) => {
    const [status, setStatus] = useState('any');
    const [faculty, setFaculty] = useState({ loading: false, faculty: null });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleStatusChange = (evt) => {
        setStatus(evt.target.value);
    }

    const fetchInfo = useCallback(() => {
        let path = `users/info`;
        setFaculty({ faculty: null, loading: true });
        call('get', path).then(res => {
            setFaculty({ loading: false, faculty: res });
        }).catch(err => {
            setFaculty({ loading: false, faculty: null })
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not load faculty info!', type: 'error' });
            }
        });
    });


    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <>
            <Container maxWidth='lg' sx={{ padding: 2 }}>
                <Typography
                    sx={{ m: 3 }}
                    textAlign='center'
                    variant="h4"
                    color='textSecondary'
                >
                    Manage Classrooms
                </Typography>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', p: 2 }} >
                    <Grid item xs={12} sm={6} md={4}>
                        <FacultyInfo faculty={faculty} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Grid container sx={{ justifyContent: 'center', alignItems: 'center', p: 2 }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant='outlined'
                                    endIcon={<AddIcon />}
                                    color='secondary'
                                    onClick={handleOpen}
                                    disabled={!Boolean(faculty.faculty)}
                                >
                                    <Typography variant='inherit' fontWeight='bold' fontFamily='Roboto'> Create Classroom </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ margin: 2 }} />
                <Grid container spacing={2} sx={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="status_select">Status</InputLabel>
                            <Select
                                labelId="status_select"
                                id="status select"
                                value={status}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value={'any'}>Any</MenuItem>
                                <MenuItem value={'active'}>Active</MenuItem>
                                <MenuItem value={'inactive'}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
            {faculty.faculty ? <Classrooms auth={auth} edit_access={true} status={status} /> : null}
            <Notification notify={notify} setNotify={setNotify} />
            <CreateClassroom open={isOpen} auth={auth} onClose={handleClose} handleUpdate={fetchInfo} />
        </>
    )
};

export default ManageClassrooms;