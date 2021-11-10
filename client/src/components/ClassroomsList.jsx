import React, { useState } from 'react';
import { Card, CardHeader, Grid, Avatar, Box, CardActions, Typography, CardContent, IconButton } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ActivateIcon from '@mui/icons-material/BookmarkAdded';
import DeactivateIcon from '@mui/icons-material/BookmarkRemove';
import ClassIcon from '@mui/icons-material/Class';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import CardsSkeleton from './Utility/CardsSkeleton';
import pickColor from '../services/colorPicker';
import Notification from './Utility/Notifications';
import PropTypes from 'prop-types';

const actions = {
    delete: {
        action: 'delete',
        type: 'error',
        message: 'Delete this classroom?'
    },
    deactivate: {
        action: 'deactivate',
        type: 'warning',
        message: 'Deactivate this classroom?'
    },
    activate: {
        action: 'activate',
        type: 'success',
        message: 'Activate this classroom?'
    },
};

const ActionButton = ({ classroom, onAction }) => {
    if (classroom.status === 'active') {
        return (
            <IconButton title='Deactivate' onClick={() => onAction({ ...actions.deactivate, id: classroom._id })} aria-label="deactivate">
                <DeactivateIcon />
            </IconButton>
        );
    }
    else {
        return (
            <IconButton title='Activate' onClick={() => onAction({ ...actions.activate, id: classroom._id })} aria-label="activate">
                <ActivateIcon />
            </IconButton>
        );
    }
};

ActionButton.propTypes = {
    classroom: PropTypes.object,
    onAction: PropTypes.func
};

const Classroom_Card = ({ classroom, edit_access, onAction }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={classroom._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} raised>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: pickColor(classroom._id) }} aria-label="recipe">
                            {String(classroom.subject).toUpperCase()[0]}
                        </Avatar>
                    }
                    action={edit_access ? <ActionButton classroom={classroom} onAction={onAction} /> : null}
                    title={classroom.subject}
                    titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                    subheader={classroom.faculty.faculty_code}
                    subheaderTypographyProps={{ variant: 'h6' }}
                />
                <CardContent>
                    <Box >
                        <Typography variant='h6'>
                            <ClassIcon sx={{ verticalAlign: 'middle' }} /> {classroom.batch.batch_code}
                        </Typography>
                    </Box>
                    <Box >
                        <Typography variant='subtitle2'>
                            <EventIcon sx={{ verticalAlign: 'middle' }} /> Created on: {new Date(classroom.createdAt).toDateString()}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ paddingX: 2 }} disableSpacing>
                    {edit_access ? <IconButton
                        title='Delete'
                        onClick={() => onAction({ ...actions.delete, id: classroom._id })}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton> : null}
                    <IconButton
                        sx={{ marginLeft: 'auto' }}
                        onClick={() => navigate(`/dashboard/classrooms/:classroom_id`)}
                        title='View'
                        aria-label="open"
                    >
                        <ReviewsIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

Classroom_Card.propTypes = {
    classroom: PropTypes.object,
    edit_access: PropTypes.bool,
    onAction: PropTypes.func
};

const ClassroomList = ({ classrooms, edit_access, onAction }) => {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    if (classrooms.loading) {
        return (
            <CardsSkeleton />
        );
    }
    else {
        if (classrooms.data.length !== 0) {
            const list = classrooms.data.map(classroom => {
                return <Classroom_Card key={classroom._id} onAction={onAction} classroom={classroom} edit_access={edit_access} />;
            });

            return (
                <>
                    <Grid container spacing={2} sx={{ justifyContent: 'space-evenly', p: 2 }} >
                        {list}
                    </Grid>
                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />
                </>
            );
        }
        else {
            return (<h1>No Classrooms</h1>);
        }
    }
};

ClassroomList.propTypes = {
    classroom: PropTypes.object,
    edit_access: PropTypes.bool,
    onAction: PropTypes.func
};

export default ClassroomList;