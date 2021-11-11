import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import FacultyDashboard from './FacultyDashboard';
import Classroom from './Classroom/Classroom';
import ManageClassrooms from './ManageClassrooms/ManageClassrooms';
import ClassroomInfo from './ClassroomInfo/ClassroomInfo';

const Fac_Dashboard = ({ auth }) => {
    return (
        <Routes>
            <Route path='/' element={<Outlet />}>
                <Route index element={<FacultyDashboard auth={auth} />} />
                <Route path='/classrooms/:class_id' element={<Classroom auth={auth} />} />
                <Route path='/classrooms/:class_id/info' element={<ClassroomInfo auth={auth} />} />
                <Route path='/classrooms/manage' element={<ManageClassrooms auth={auth} />} />
            </Route>
        </Routes>
    );
};

export default Fac_Dashboard;