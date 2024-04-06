import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from '../routes/Login';
import Register from '../routes/Register';
import Forgot from '../routes/Forgot';
import Dashboard from '../routes/Dashboard';
import PermissionAssigner from '../routes/PermissionAssigner';
import Cookies from 'js-cookie';
export const Approuter = () => {
    const [tokenState, setTokenState] = useState(null);

    useEffect(() => {
        // Aquí podrías realizar la lógica para verificar si existe un token almacenado,
        // por ejemplo, consultando el token desde el almacenamiento local (localStorage).
        // Actualiza el estado del token en función del resultado.
        // const token = localStorage.getItem('token');
        const cookieToken = Cookies.get('token');
        setTokenState(cookieToken);
    }, []);

    return (
        <Routes>
            <Route path="/" element={tokenState != null ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/dashboard" element={tokenState ? <Dashboard token={tokenState}/>: <Navigate to="/"/>} />
            <Route path="/permissions" element={tokenState ? <PermissionAssigner token={tokenState}/>: <Navigate to="/permissions"/>} />
        </Routes>
    );
};
