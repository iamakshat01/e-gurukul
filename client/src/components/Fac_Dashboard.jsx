import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Classrooms from './Classrooms';

const Fac_Dashboard = ({ auth }) => {
    console.log('Dashboard');
    return (
        <Routes>
            <Route path='/' element={<Outlet/>}>
                <Route index element={<Classrooms auth={auth} status='active' />} />
                <Route path='/classrooms/:classroom_id' element={<Classrooms auth={auth} />} />
            </Route>
        </Routes>
    );
};

export default Fac_Dashboard;