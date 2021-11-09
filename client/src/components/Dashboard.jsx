import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import FacultyDashboard from './Fac_Dashboard';\


const Dashboard = ({auth}) => {
    return (
        <AdminDashboard />
        // (auth.role === 'faculty' ? <FacultyDashboard auth={auth} /> : null)
    );
};

export default Dashboard;