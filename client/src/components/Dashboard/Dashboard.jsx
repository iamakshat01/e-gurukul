import React from 'react';
import AdminDashboard from '../Routes/Admin_Dash';
import Faculty_Routes from '../Faculty_Routes';
import Student_Routes from '../Student_Routes';

const Dashboard = ({auth}) => {

    if(auth.role==='faculty'){
        return <Faculty_Routes auth={auth}/>
    }
    else if(auth.role==='admin'){
        return  <AdminDashboard auth={auth} />
    }
    else if(auth.role==='student'){
        return <Student_Routes auth={auth}/>
    }
};

export default Dashboard;