import React, { useState } from 'react';
import AdminDashboard from './Admin_Dash';
import FacultyDashboard from './Fac_Dashboard';


const Dashboard = ({auth}) => {

    if(auth.role==='faculty'){
        return <FacultyDashboard auth={auth}/>
    }
    else if(auth.role==='admin'){
        return  <AdminDashboard auth={auth} />
    }
};

export default Dashboard;