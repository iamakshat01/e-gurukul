import React, { useCallback, useEffect, useState } from 'react';
import {
    Routes,
    Route,
    Outlet
} from "react-router-dom";
import { useNavigate } from 'react-router';
import { isAuthenticated, removeToken, setToken } from '../services/api';
import Home from './Home';
import Navigation from './Navigation/Navigation';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile/Profile';
import PageNotFound from './Utility/PageNotFound';
import ContactUs from './Contact/ContactUs';

const ProtectedView = ({ auth, handleLogOut }) => {
    return (
        <>
            <Routes>
                <Route path='/' element={
                    <>
                        <Navigation auth={auth} handleLogOut={handleLogOut} />
                        <Outlet />
                    </>
                }>
                    <Route path='home' element={<Home />} />
                    <Route path='contact_us' element={<ContactUs />} />
                    <Route path='profile' element={<Profile auth={auth}/>} />
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
                <Route path='contact_us' element={<ContactUs />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
};

const Main = () => {

    let [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(isAuthenticated());
        setToken(localStorage.getItem('jwtToken'));
    }, []);

    const handleLogIn = (auth) => {
        setAuth(auth);
    };

    const handleLogOut = () => {
        removeToken();
        setAuth(false);
        navigate('/')
    };
    return (auth ? <ProtectedView auth={auth} handleLogOut={handleLogOut} /> : <UnprotectedView auth={auth} handleLogin={handleLogIn} />);
};

export default Main;