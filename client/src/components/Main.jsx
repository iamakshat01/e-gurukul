import React, { useCallback, useEffect, useState } from 'react';
import {
    Routes,
    Route
} from "react-router-dom";

import { isAuthenticated, removeToken } from '../services/api';
import Home from './Home';
import Navigation from './Navigation';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';

const ProtectedView = ({ auth, handleLogOut }) => {
    return (
        <>
            <Navigation auth={auth} handleLogOut={handleLogOut} />
            <Routes>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='*' element={<Dashboard />} />
            </Routes>
        </>
    );
};

const UnprotectedView = ({ auth, handleLogin }) => {
    return (
        <Routes>
            <Route path='/login' exact element={<Login handleLogin={handleLogin} />} />
            <Route path='*' element={
                <>
                    <Navigation auth={auth} />
                    <Home />
                </>
            } />
        </Routes>
    );
};

const Main = () => {

    let [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(isAuthenticated());
    }, []);

    const handleLogIn = useCallback((auth) => {
        setAuth(auth);
    },[setAuth]);

    const handleLogOut = useCallback(() => {
        removeToken();
        setAuth(false);
    },[setAuth]);
    return (auth ? <ProtectedView auth={auth}  handleLogOut={handleLogOut}/> : <UnprotectedView auth={auth} handleLogin={handleLogIn} />);
};

export default Main;