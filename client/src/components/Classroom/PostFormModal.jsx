import React from 'react';
import { Modal, Container, Paper, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import PostForm from './PostForm';
import BreadCrumb from '../Utility/BreadCrumb';
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
    return (
        <Modal
            open={true}
            onClose={() => navigate(-1, { replace: true, state: { refresh: true } })}
            aria-labelledby="Post form modal"
            aria-describedby="Post form modal"
        >
            <Container maxWidth="lg">
                <Paper elevation={4} sx={style}>
                    <Grid container>
                        <BreadCrumb />
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