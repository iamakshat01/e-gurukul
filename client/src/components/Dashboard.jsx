import React from 'react';
import AdminDashboard from './Admin_Dash';
import Faculty_Routes from './Faculty_Routes';


const Dashboard = ({auth}) => {

    if(auth.role==='faculty'){
        return <Faculty_Routes auth={auth}/>
    }
    else if(auth.role==='admin'){
        return  <AdminDashboard auth={auth} />
    }
};

export default Dashboard;