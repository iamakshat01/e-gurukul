import React, { useState } from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";

import {isAuthenticated} from '../services/api';
import Home from './Home';
import Navigation from './Navigation';
import Login from './Login';
import Dashboard from './Dashboard';
import User_Info from './UserInfo';

const ProtectedView = () => {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path = 'dashboard' element={<Dashboard />} />
                <Route path = 'user_info' element={<User_Info />} />
                <Route path = '*' element = {<Dashboard />} />
            </Routes>
        </>
    );
};

const UnprotectedView = () => {
    return (
        <Routes>
            <Route path = '/login' exact element = {<Login />} />
            <Route path = '*' element = {
                <>
                    <Navigation />
                    <Home />
                </>
            } />
        </Routes>
    );
};

const Main = (props) => {
    
    const token = isAuthenticated();

    return ( token ? <ProtectedView /> : <UnprotectedView /> );
}

export default Main;