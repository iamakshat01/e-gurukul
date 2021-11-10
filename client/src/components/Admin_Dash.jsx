import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Admin from './AdminDashboard';
import CreateBatch from './CreateBatch';

const AdminDashboard = ({ auth }) => {
    console.log('Dashboard');
    return (
        <Routes>
            <Route path='/' element={<Outlet/>}>
                <Route index element={<Admin auth={auth} />} />
                <Route path='/createbatch' element={<CreateBatch />} />
            </Route>
        </Routes>
    );
};

export default AdminDashboard;