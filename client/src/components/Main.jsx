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
<<<<<<< HEAD
import CreateBatch from './CreateBatch';
=======
import PageNotFound from './PageNotFound';
>>>>>>> 72f801677aa401c5fb21d80d34416d6931216817

const ProtectedView = ({ auth, handleLogOut }) => {
    return (
        <>
            <Routes>
<<<<<<< HEAD
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='profile' element={<Profile />} />
                <Route path='/createbatch' element={<CreateBatch/>}/>
                <Route path='*' element={<Dashboard />} />
=======
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
>>>>>>> 72f801677aa401c5fb21d80d34416d6931216817
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