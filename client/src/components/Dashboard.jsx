import React, { useState } from 'react';
import FacultyDashboard from './FacultyDashboard';

const Dashboard = ({auth}) => {
    return (
        (auth.role === 'faculty' ? <FacultyDashboard auth={auth} /> : null)
    );
};

export default Dashboard;