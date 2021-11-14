import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams, Outlet } from 'react-router';
import { call } from '../../services/api';
import {
    Grid,
    Container,
    Typography,
    Avatar,
    Button,
    Divider,
    Menu,
    MenuItem,
    Link,
    IconButton
} from '@mui/material';
import Notification from '../Utility/Notifications';
import ResponsiveSkeleton from '../Utility/ResponsiveSkeleton';
import AddIcon from '@mui/icons-material/Add';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InfoIcon from '@mui/icons-material/Info';
import pickColor from '../../services/colorPicker';
import Posts from './Posts';
import PostFormModal from './PostFormModal';
import BreadCrumb from '../Utility/BreadCrumb';

const ClassroomInfo = ({ stream, auth }) => {
    const navigate = useNavigate()
    if (stream.loading || !stream.stream) {
        return (
            <ResponsiveSkeleton count={3} />
        );
    }
    else {
        let { classroom } = stream.stream;
        return (
            <Grid container spacing={2} sx={{ justifyContent: 'flex-start', alignItems: 'center', paddingX: 8 }}>
                <Grid item sx={{ display: 'flex', flexDirection: 'row' }} xs={12} sm={6}>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        <Grid item >
                            <Avatar sx={{ bgcolor: pickColor(classroom._id) }} aria-label="recipe">
                                {String(classroom.subject).toUpperCase()[0]}
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'>
                                {classroom.subject}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton title='info' onClick={() => navigate('info')} >
                                <InfoIcon color='info' />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'row' }} xs={12} sm={6}>
                    <Grid container spacing={2} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        {
                            auth.role === 'student' ?
                                (<Grid item>
                                    <Typography color='GrayText' variant='subtitle1'>
                                        Faculty: {classroom.faculty.faculty_code}
                                    </Typography>
                                </Grid>) :
                                (<Grid item>
                                    <Typography color='GrayText' variant='subtitle1'>
                                        Batch: {classroom.batch.batch_code}
                                    </Typography>
                                </Grid>)
                        }
                    </Grid>
                </Grid>
            </Grid >
        );
    }
};

const ClassroomActions = ({ auth, stream }) => {
    const [anchorEl, setAnchor] = useState(null);
    const navigate = useNavigate();

    const handleOpen = (evt) => {
        setAnchor(evt.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    }

    if (stream.loading || !stream.stream) {
        return (
            <>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }} >
                    <ResponsiveSkeleton count={1} />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }} >
                    <ResponsiveSkeleton count={1} />
                </Grid>
            </>
        );
    }
    else {
        let { classroom } = stream.stream
        return (
            <>
                <Grid item xs={6} sx={{ display: 'flex', justifySelf: 'flex-start', justifyContent: 'flex-start', alignItems: 'center', p: 2 }} >
                    {
                        auth.role === 'faculty' ? (
                            <Button
                                variant='contained'
                                endIcon={<AddIcon />}
                                color='secondary'
                                onClick={() => navigate('post')}
                            >
                                <Typography variant='inherit' fontWeight='bold' fontFamily='Roboto'> Create Post </Typography>
                            </Button>) : null
                    }
                </Grid>
                < Grid item xs={6} sx={{ display: 'flex', justifySelf: 'flex-end', justifyContent: 'flex-end', alignItems: 'center', p: 2 }} >
                    <Button
                        variant='contained'
                        endIcon={<VideoCallIcon />}
                        color='info'
                        onClick={handleOpen}
                        disabled={!stream.stream || (!classroom.meet_link && !classroom.alternate_link)}
                    >
                        <Typography variant='inherit' fontWeight='bold' fontFamily='Roboto'> Meet </Typography>
                    </Button>
                </Grid >
                <Menu
                    id="meet"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'meet links',
                    }}
                >
                    {Boolean(classroom.meet_link) ?
                        <MenuItem onClick={handleClose}>
                            <Link color='info.main' href={classroom.meet_link} >Meet Link</Link>
                        </MenuItem>
                        : null
                    }
                    {Boolean(classroom.alternate_link) ?
                        <MenuItem onClick={handleClose}>
                            <Link color='secondary.main' href={classroom.alternate_link} >Alternate Link</Link>
                        </MenuItem>
                        : null
                    }
                </Menu>
            </>
        );
    }
};

const Classroom = ({ auth }) => {
    const [stream, setStream] = useState({ loading: false, stream: null });
    const { class_id } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const fetchStream = useCallback(() => {
        let path = `${auth.role}/classrooms/${class_id}/posts`
        setStream({ loading: true, stream: null });
        call('get', path).then(res => {
            setStream({ loading: false, stream: res });
        }).catch(err => {
            setStream({ loading: false, stream: null })
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not load fetch classroom stream!', type: 'error' });
            }
        });
    }, []);

    useEffect(() => {
        fetchStream();
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <BreadCrumb />
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', p: 2 }} >
                    <Grid item xs={12}>
                        <ClassroomInfo stream={stream} auth={auth} />
                    </Grid>
                </Grid>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', p: 2 }} >
                    <ClassroomActions stream={stream} auth={auth} />
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', p: 2 }} >
                    <Posts stream={stream} auth={auth} />
                </Grid>
            </Container>
            <Notification notify={notify} setNotify={setNotify} />
            <Outlet />
            {
                auth.role === 'faculty' ? (
                    <Routes>
                        <Route path='post' element={<PostFormModal handleUpdate={fetchStream} auth={auth} />} />
                        <Route path='post/:post_id' element={<PostFormModal handleUpdate={fetchStream} auth={auth} />} />
                    </Routes>
                ) : null
            }
        </>
    );
};

export default Classroom;