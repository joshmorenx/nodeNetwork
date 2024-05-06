import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './routes/Login';
import Register from './routes/Register';
import Forgot from './routes/Forgot';
import Dashboard from './routes/Dashboard';
import Feed from './routes/Feed';
// import PermissionManager from '../src/components/PermissionManager'
import Cookies from 'js-cookie';

export const NotFound = () => {
    return(
        <>
            <h1>Te perdiste? La pagina que ingresaste no existe 🤣🤣🤣🤣🤣</h1>
        </>
    );
};
export const App = () => {
    const cookieToken = Cookies.get('token');
    const [tokenState, setTokenState] = useState(null);

    useEffect(() => {
        setTokenState(cookieToken);
    }, [ cookieToken ]);

    return (
        <Routes>
            <Route path="/" element={tokenState ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={tokenState ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/dashboard" element={tokenState ? <Dashboard token={tokenState}/>: <Navigate to="/"/>} />
            <Route path="/feed" element={<Feed token={tokenState ? tokenState : null}/>} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/permissions" element={tokenState ? <PermissionManager token={tokenState}/>: <Navigate to="/permissions"/>} /> */}
        </Routes>
    );
};
