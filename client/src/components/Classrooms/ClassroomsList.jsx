import React, { useState } from 'react';
import { Card, CardHeader, Badge, Grid, Avatar, Box, CardActions, Typography, CardContent, IconButton, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ActivateIcon from '@mui/icons-material/BookmarkAdded';
import DeactivateIcon from '@mui/icons-material/BookmarkRemove';
import ClassIcon from '@mui/icons-material/Class';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import CardsSkeleton from '../Utility/CardsSkeleton';
import pickColor from '../../services/colorPicker';
import Notification from '../Utility/Notifications';
import PropTypes from 'prop-types';
import parseDate from '../../services/dateParser';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';

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

const useStyles = makeStyles(theme => ({
    activateButton: {
        '&:hover .icon': {
            color: theme.palette.success.main
        }
    },
    deactivateButton: {
        '&:hover .icon': {
            color: theme.palette.error.main
        }
    },
    infoButton: {
        '&:hover .icon': {
            color: theme.palette.info.main
        }
    },
    editButton: {
        '&:hover .icon': {
            color: theme.palette.info.main
        }
    },
    active: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.main,
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
        }
    },
    inactive: {
        '& .MuiBadge-badge': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.main,
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
        }
    }
}));

const ActionButton = ({ classroom, onAction }) => {
    const classes = useStyles();
    if (classroom.status === 'active') {
        return (
            <IconButton title='Deactivate' className={classes.deactivateButton} onClick={() => onAction({ ...actions.deactivate, id: classroom._id })} aria-label="deactivate">
                <DeactivateIcon className={'icon'} />
            </IconButton>
        );
    }
    else {
        return (
            <IconButton title='Activate' className={classes.activateButton} onClick={() => onAction({ ...actions.activate, id: classroom._id })} aria-label="activate">
                <ActivateIcon className={'icon'} />
            </IconButton>
        );
    }
};

ActionButton.propTypes = {
    classroom: PropTypes.object,
    onAction: PropTypes.func
};

const Classroom_Card = ({ classroom, edit_access, onAction }) => {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={classroom._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} raised>
                <CardHeader
                    avatar={
                        <Badge
                            overlap="circular"
                            color='error'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            className={classroom.status === 'active' ? classes.active : classes.inactive}
                        >
                            <Avatar sx={{ bgcolor: pickColor(classroom._id) }} aria-label="recipe">
                                {String(classroom.subject).toUpperCase()[0]}
                            </Avatar>
                        </Badge>
                    }
                    action={edit_access ? <ActionButton classroom={classroom} onAction={onAction} /> : null}
                    title={classroom.subject}
                    titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                    subheader={classroom.faculty.faculty_code}
                    subheaderTypographyProps={{ variant: 'h6' }}
                />
                <Divider />
                <CardContent>
                    <Box >
                        <Typography variant='h6'>
                            <ClassIcon sx={{ verticalAlign: 'middle' }} /> {classroom.batch.batch_code}
                        </Typography>
                    </Box>
                    <Box >
                        <Typography color='textSecondary' variant='subtitle2'>
                            <EventIcon fontSize='small' sx={{ verticalAlign: 'middle' }} /> Created on: {parseDate(classroom.createdAt)}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ paddingX: 2, display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                    {edit_access ? (
                        <>
                            <IconButton
                                title='Delete'
                                onClick={() => onAction({ ...actions.delete, id: classroom._id })}
                                className={classes.deactivateButton}
                                aria-label="delete"
                            >
                                <DeleteIcon className={'icon'} />
                            </IconButton>
                            <IconButton
                                title='Edit'
                                onClick={() => navigate(`/classrooms/${classroom._id}/info`)}
                                className={classes.editButton}
                                aria-label="edit"
                            >
                                <EditIcon className={'icon'} />
                            </IconButton>
                        </>
                    ) : null}
                    <IconButton
                        sx={(edit_access ? {} : { marginLeft: 'auto' })}
                        onClick={() => navigate(`/classrooms/${classroom._id}`)}
                        title='View'
                        className={classes.infoButton}
                        aria-label="open"
                    >
                        <ArrowForwardIosIcon className={'icon'} />
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
            return (
                <Typography variant='h3' textAlign='center'>
                    No Classrooms
                </Typography>
            );
        }
    }
};

ClassroomList.propTypes = {
    classroom: PropTypes.object,
    edit_access: PropTypes.bool,
    onAction: PropTypes.func
};

export default ClassroomList;