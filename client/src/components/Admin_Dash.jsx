import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Admin from './AdminDashboard';
import CreateBatch from './CreateBatch';
import SingleBatch from './SingleBatch'

const AdminDashboard = ({ auth }) => {
    console.log('Dashboard');
    return (
        <Routes>
            <Route path='/' element={<Outlet/>}>
                <Route index element={<Admin auth={auth} />} />
                <Route path='/createbatch' element={<CreateBatch />} />
                <Route path='/batch/:batch_id' element={<SingleBatch />} />
            </Route>
        </Routes>
    );
};

export default AdminDashboard;