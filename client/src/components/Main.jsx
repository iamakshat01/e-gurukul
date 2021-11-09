import React, { useCallback, useEffect, useState } from 'react';
import {
    Routes,
    Route,
    Outlet
} from "react-router-dom";

import { isAuthenticated, removeToken, setToken } from '../services/api';
import Home from './Home';
import Navigation from './Navigation/Navigation';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PageNotFound from './PageNotFound';

const ProtectedView = ({ auth, handleLogOut }) => {
    return (
        <>
            <Routes>
                <Route path='/' element={
                    <>
                        <Navigation auth={auth} handleLogOut={handleLogOut}/>
                        <Outlet />
                    </>
                }>
                    <Route path='home' element={<Home />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='dashboard/*' element={<Dashboard auth={auth} />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    );
};

const UnprotectedView = ({ auth, handleLogin }) => {
    return (
        <Routes>
            <Route path='/login' exact element={<Login handleLogin={handleLogin} />} />
            <Route path='/' element={
                <>
                    <Navigation auth={auth} />
                    <Outlet />
                </>
            }>
                <Route path='home' element={<Home />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
};

const Main = () => {

    let [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(isAuthenticated());
        setToken(localStorage.getItem('jwtToken'));
    }, []);

    const handleLogIn = useCallback((auth) => {
        setAuth(auth);
    }, [setAuth]);

    const handleLogOut = useCallback(() => {
        removeToken();
        setAuth(false);
    }, [setAuth]);
    return (auth ? <ProtectedView auth={auth} handleLogOut={handleLogOut} /> : <UnprotectedView auth={auth} handleLogin={handleLogIn} />);
};

export default Main;