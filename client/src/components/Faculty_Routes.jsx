import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import FacultyDashboard from './FacultyDashboard';
import Classroom from './Classroom/Classroom';
import ManageClassrooms from './ManageClassrooms/ManageClassrooms';

const Fac_Dashboard = ({ auth }) => {
    return (
        <Routes>
            <Route path='/' element={<Outlet />}>
                <Route index element={<FacultyDashboard auth={auth} />} />
                <Route path='/classrooms/:classroom_id' element={<Classroom auth={auth} />} />
                <Route path='/classrooms/manage' element={<ManageClassrooms auth={auth} />} />
            </Route>
        </Routes>
    );
};

export default Fac_Dashboard;