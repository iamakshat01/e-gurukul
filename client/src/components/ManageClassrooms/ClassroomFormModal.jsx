import React from 'react';
import { Modal, Container, Paper, Typography, Box, Grid } from '@mui/material';
import ClassroomForm from './ClassroomForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    bgColor: 'background.paper'
};

const FormModal = ({ open, onClose, edit, data}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container maxWidth="lg">
                <Paper elevation={4} sx={style}>
                    <Grid container>
                        <Grid item>
                            <ClassroomForm edit={edit} data={data} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Modal>
    )
};

export default FormModal;