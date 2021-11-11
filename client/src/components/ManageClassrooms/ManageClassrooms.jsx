import { Container, Grid, Card, CardHeader, Avatar, Divider, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Classrooms from '../Classrooms';
import { call } from '../../services/api';
import pickColor from '../../services/colorPicker';
import Notification from '../Utility/Notifications';
import CreateClassroom from './ClassroomFormModal';

const FacultyInfo = ({ faculty }) => {
    if (faculty.loading) {
        return (
            <h1>Loading</h1>);
    }
    else {
        if (faculty.faculty) {
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
        else {
            return null;
        }
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
        setFaculty({ faculty: [], loading: true });
        call('get', path).then(res => {
            setFaculty({ loading: false, faculty: res });
        }).catch(err => {
            setFaculty({ loading: false, faculty: [] })
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
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', p: 2 }} >
                    <Grid item xs={12} sm={6} md={4}>
                        <FacultyInfo faculty={faculty} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Grid container>
                            <Grid item xs={12}>
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
                <Grid container spacing={2} sx={{ justifyContent: 'flex-end', alignItems: 'center', p: 2 }} >
                    <Grid item xs={12} sm={6} md={4}>
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
            <Classrooms auth={auth} edit_access={true} status={status} />
            <Notification notify={notify} setNotify={setNotify} />
            <CreateClassroom open={isOpen} onClose={handleClose} />
        </>
    )
};

export default ManageClassrooms;