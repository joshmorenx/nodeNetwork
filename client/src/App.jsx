import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Forgot from './routes/Forgot';
import Dashboard from './routes/Dashboard';
import Feed from './routes/Feed';
import Profile from './routes/Profile.jsx';
import Posts from './routes/Posts.jsx';
import Follows from './routes/Follows.jsx';
import Search from './routes/Search.jsx';
import Gallery from './routes/Gallery.jsx';
import NotFound from './routes/NotFound.jsx';
import Notifications from './components/Notifications.jsx';
import Cookies from 'js-cookie';

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
            <Route path="/search/:query?" element={cookieToken ? <Search token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="/gallery/:username?" element={cookieToken ? <Gallery token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="/notifications" element={cookieToken ? <Notifications token={cookieToken} /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
