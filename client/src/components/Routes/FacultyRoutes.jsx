import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import FacultyDashboard from '../Dashboard/FacultyDashboard';
import Classroom from '../Classroom/Classroom';
import ManageClassrooms from '../ManageClassrooms/ManageClassrooms';
import ClassroomInfo from '../ClassroomInfo/ClassroomInfo';
import PageNotFound from '../Utility/PageNotFound';
import Navigation from '../Navigation/Navigation';

const FacultyRoutes = ({ auth, handleLogOut }) => {
    return (
        <Routes>
            <Route element={
                <>
                    <Navigation auth={auth} handleLogOut={handleLogOut} />
                    <Outlet />
                </>
            }>
                <Route index element={<FacultyDashboard auth={auth} />} />
                <Route path='classrooms/:class_id/*' element={<Classroom auth={auth} />} />
                <Route path='classrooms/:class_id/info' element={<ClassroomInfo auth={auth} />} />
                <Route path='manage_classrooms' element={<ManageClassrooms auth={auth} />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
};

export default FacultyRoutes;