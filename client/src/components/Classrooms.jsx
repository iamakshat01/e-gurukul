import { Container } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { call } from '../services/api';
import Notification from './Utility/Notifications';
import ClassroomsList from './ClassroomsList';
import ConfirmDialog from './Utility/ConfirmDialog';

const initialAction = { action: '', type: '', message: '', id: '' }

const Classrooms = ({ auth, status, edit_access }) => {
    const [classrooms, setClassrooms] = useState({ loading: false, data: [] });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [action, setAction] = useState(initialAction);

    const onAction = ({ action, type, id, message }) => {
        setAction({ action, type, id, message });
    }

    const handleClose = () => {
        setAction({ ...initialAction });
    }

    const handleAction = useCallback(() => {
        switch (action.action) {
            case 'delete':
                call('delete', `faculty/classrooms/${action.id}`).then(res => {
                    setNotify({ isOpen: true, message: 'Classroom deleted successfully', type: 'success' });
                    handleClose();
                    fetchClassrooms();
                }).catch(err => {
                    handleClose();
                    if (err.response) {
                        setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
                    }
                    else {
                        setNotify({ isOpen: true, message: 'Could not delete the classroom!', type: 'error' });
                    }
                });
                break;
            case 'deactivate':
                call('post', `faculty/classrooms/${action.id}/deactivate`).then(res => {
                    setNotify({ isOpen: true, message: 'Classroom deactivated successfully', type: 'success' });
                    handleClose();
                    fetchClassrooms();
                }).catch(err => {
                    handleClose();
                    if (err.response) {
                        setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
                    }
                    else {
                        setNotify({ isOpen: true, message: 'Could not deactivate the classroom!', type: 'error' });
                    }
                });
                break;
            case 'activate':
                call('post', `faculty/classrooms/${action.id}/activate`).then(res => {
                    setNotify({ isOpen: true, message: 'Classroom activated successfully', type: 'success' });
                    handleClose();
                    fetchClassrooms();
                }).catch(err => {
                    handleClose();
                    if (err.response) {
                        setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
                    }
                    else {
                        setNotify({ isOpen: true, message: 'Could not activate the classroom!', type: 'error' });
                    }
                });
                break;
            default:
        }
    });

    const fetchClassrooms = useCallback(() => {
        let st = (status === 'any' ? '' : status);
        let path = `faculty/classrooms/list/${st}`;
        if (auth.role === 'student') {
            path = `student/classrooms/list/${st}`
        }
        setClassrooms({ data: [], loading: true });
        call('get', path).then(res => {
            setClassrooms({ loading: false, data: res });
        }).catch(err => {
            setClassrooms({ loading: false, data: [] })
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not load classrooms!', type: 'error' });
            }
        });
    });

    useEffect(() => {
        fetchClassrooms();
    }, [status]);

    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <ClassroomsList classrooms={classrooms} onAction={onAction} edit_access={edit_access} />
            <Notification notify={notify} setNotify={setNotify} />
            {edit_access ? (<ConfirmDialog
                onConfirm={handleAction}
                onCancel={handleClose}
                message={action.message}
                type={action.type}
                open={Boolean(action.id)}
            />) : null}
        </Container>
    );
};

export default Classrooms;