import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import AddUsers from '../Batch/AddUsers';
import Admin from '../Dashboard/AdminDashboard';
import CreateBatch from '../Batch/CreateBatch';
import SingleBatch from '../Batch/SingleBatch'

const AdminDashboard = ({ auth }) => {
    console.log('Dashboard');
    return (
        <Routes>
            <Route path='/' element={<Outlet/>}>
                <Route index element={<Admin auth={auth} />} />
                <Route path='/createbatch' element={<CreateBatch />} />
                <Route path='/batch/:batch_id' element={<SingleBatch />} />
                <Route path='/addusers' element={<AddUsers />} />
            </Route>
        </Routes>
    );
};

export default AdminDashboard;