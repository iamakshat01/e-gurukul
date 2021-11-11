import { Container} from '@mui/material';
import React  from 'react';
import Classrooms from './Classrooms';


const FacultyDashboard = ({ auth }) => {
    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <Classrooms auth={auth} status={'active'} edit_access={false} />
        </Container>
    );
};

export default FacultyDashboard;