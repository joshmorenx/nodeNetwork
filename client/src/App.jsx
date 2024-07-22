import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './routes/Login';
import Register from './routes/Register';
import Forgot from './routes/Forgot';
import Dashboard from './routes/Dashboard';
import Feed from './routes/Feed';
import Profile from './routes/Profile.jsx';
import Posts from './routes/Posts.jsx';
import Follows from './routes/Follows.jsx';
import NotFound from './routes/NotFound.jsx';
import Cookies from 'js-cookie';
import { element } from 'prop-types';

export const App = () => {
    const cookieToken = Cookies.get('token');

    return (
        <Routes>
            <Route path="/" element={cookieToken ? <Navigate to="/feed" /> : <Login />} />
            <Route path="/register" element={cookieToken ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/dashboard" element={cookieToken ? <Dashboard token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="/feed" element={cookieToken ? <Feed token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="/profile/:username?" element={cookieToken ? <Profile token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="/posts/:post_id?" element={cookieToken ? <Posts token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="/follows/:username?" element={cookieToken ? <Follows token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
