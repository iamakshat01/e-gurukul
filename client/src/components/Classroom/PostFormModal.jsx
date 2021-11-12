import React, { useContext } from 'react';
import { Modal, Container, Paper, Typography, Box, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import PostForm from './PostForm';
import { ClassroomContext } from './Classroom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    bgColor: 'background.paper'
};

const PostFormModal = ({ auth, handleUpdate }) => {
    const navigate = useNavigate();
    const { class_id } = useParams();
    return (
        <Modal
            open={true}
            onClose={() => navigate(`/dashboard/classrooms/${class_id}`, { state: { refresh: true } })}
            aria-labelledby="Post form modal"
            aria-describedby="Post form modal"
        >
            <Container maxWidth="lg">
                <Paper elevation={4} sx={style}>
                    <Grid container>
                        <Grid item>
                            <PostForm handleUpdate={handleUpdate} auth={auth} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Modal>
    )
};

export default PostFormModal;