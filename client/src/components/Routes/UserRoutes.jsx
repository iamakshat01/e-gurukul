import React from 'react';
import AdminRoutes from './AdminRoutes';
import FacultyRoutes from './FacultyRoutes';
import StudentRoutes from './StudentRoutes';

const User_Routes = ({auth}) => {

    if(auth.role==='faculty'){
        return <FacultyRoutes auth={auth}/>
    }
    else if(auth.role==='admin'){
        return  <AdminRoutes auth={auth} />
    }
    else if(auth.role==='student'){
        return <StudentRoutes auth={auth}/>
    }
};

export default User_Routes;