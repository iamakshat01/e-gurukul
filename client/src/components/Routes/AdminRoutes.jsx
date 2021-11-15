import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import AddUsers from '../Batch/AddUsers';
import Admin from '../Dashboard/AdminDashboard';
import CreateBatch from '../Batch/CreateBatch';
import SingleBatch from '../Batch/SingleBatch'
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../Utility/PageNotFound';

const AdminRoutes = ({ auth, handleLogOut }) => {
    return (
        <Routes>
            <Route element={
                <>
                    <Navigation auth={auth} handleLogOut={handleLogOut} />
                    <Outlet />
                </>
            }>
                <Route index element={<Admin auth={auth} />} />
                <Route path='/createbatch' element={<CreateBatch />} />
                <Route path='/batch/:batch_id' element={<SingleBatch />} />
                <Route path='/addusers' element={<AddUsers />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
};

export default AdminRoutes;