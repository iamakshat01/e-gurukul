import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Admin from './AdminDashboard';

const AdminDashboard = ({ auth }) => {
    console.log('Dashboard');
    return (
        <Routes>
            <Route path='/' element={<Outlet/>}>
                <Route index element={<Admin auth={auth} />} />
                {/* <Route path='/batch/:c_id' element={<Classrooms auth={auth} />} /> */}
            </Route>
        </Routes>
    );
};

export default AdminDashboard;