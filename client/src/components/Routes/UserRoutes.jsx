import React from 'react';
import AdminRoutes from './AdminRoutes';
import FacultyRoutes from './FacultyRoutes';
import StudentRoutes from './StudentRoutes';

const User_Routes = ({ auth, handleLogOut }) => {

    if (auth.role === 'faculty') {
        return <FacultyRoutes auth={auth} handleLogOut={handleLogOut} />
    }
    else if (auth.role === 'admin') {
        return <AdminRoutes auth={auth} handleLogOut={handleLogOut} />
    }
    else if (auth.role === 'student') {
        return <StudentRoutes auth={auth} handleLogOut={handleLogOut} />
    }
};

export default User_Routes;