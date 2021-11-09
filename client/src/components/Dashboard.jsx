import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import FacultyDashboard from './Fac_Dashboard';


const Dashboard = ({auth}) => {
    return (
        (auth.role === 'faculty' ? <FacultyDashboard auth={auth} /> : null)
        (auth.role === 'admin' ? <AdminDashboard auth={auth} /> : null)
    );
};

export default Dashboard;