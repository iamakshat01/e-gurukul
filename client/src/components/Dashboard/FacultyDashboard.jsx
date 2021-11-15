import { Container, Typography } from '@mui/material';
import React from 'react';
import Classrooms from '../Classrooms/Classrooms';


const FacultyDashboard = ({ auth }) => {
    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <Typography
                sx={{ m: 3 }}
                textAlign='center'
                variant="h4"
                color='textSecondary'
            >
                Dashboard
            </Typography>
            <Classrooms auth={auth} status={'active'} edit_access={false} />
        </Container>
    );
};

export default FacultyDashboard;