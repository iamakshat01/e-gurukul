import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import FacultyDashboard from '../Dashboard/FacultyDashboard';
import Classroom from '../Classroom/Classroom';
import ClassroomInfo from '../ClassroomInfo/ClassroomInfo';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../Utility/PageNotFound';

const StudentRoutes = ({ auth, handleLogOut }) => {
    return (
        <Routes>
            <Route element={
                <>
                    <Navigation auth={auth} handleLogOut={handleLogOut} />
                    <Outlet />
                </>
            }>
                <Route index element={<FacultyDashboard auth={auth} />} />
                <Route path='/classrooms/:class_id/*' element={<Classroom auth={auth} />} />
                <Route path='/classrooms/:class_id/info' element={<ClassroomInfo auth={auth} />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
};

export default StudentRoutes;