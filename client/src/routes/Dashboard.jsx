import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import UserCard from '../components/UserCard';
import ContentContainer from '../components/ContentContainer';
import { Button, Box } from '@mui/material/'
import { useNavigate } from 'react-router-dom';
import ImageViewer from '../components/ImageViewer';
import { useMediaQuery } from '@mui/material';
import MobileNavMenu from '../components/MobileNavMenu';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const Dashboard = ({ token }) => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('assign');
    const [imgClickedPath, setImgClickedPath] = useState(null)
    const isSettingsRoute = true
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    useEffect(() => {
        // console.log('Token:', token);||
    }, [token]);

    const { logout } = useLogout(token);

    const { user, error } = useGetCurrentUser({ token }); // must gather the profile image here
    const handleLogout = () => {
        logout()
    };

    let { cadena, allAccess } = usePermissions(user)

    const showClickedContent = (section) => {
        setSelectedSection(section);
    }

    const handleImageClicked = (event) => {
        if (event) {
            setImgClickedPath(event.target.src);
        }
    }

    return (
        <>
        <Helmet>
            <title>Dashboard - Node Network</title>
        </Helmet>
            {isDesktop ? (
                <div className="dashboard-container">
                    <div className={"profile-container text-center " + className}>
                        <div>
                            {error ? (
                                <p>Error al obtener el contenido del usuario: {error.message}</p>
                            ) : (
                                <UserCard user={user} allAccess={allAccess} cadena={cadena} handleImageClicked={handleImageClicked} id={user.userId} />
                            )}
                        </div>

                        <Box className='sections-container mt-5' sx={{ mt: 4 }}>
                            <Box
                                className={selectedSection === 'feed' ? 'bg-blue-800 mt-1 text-white cursor-pointer rounded-sm text-base' : 'bg-blue-500 mt-1 text-white cursor-pointer rounded-sm text-base'}
                                // onClick={()=>showClickedContent('feed')}>
                                onClick={() => navigate('/feed')}>
                                Feed
                            </Box>

                            {(allAccess || user.userId === 1) ? (
                                <Box
                                    className={selectedSection === 'assign' ? 'bg-blue-800 mt-1 text-white cursor-pointer rounded-sm text-base' : 'bg-blue-500 mt-1 text-white cursor-pointer rounded-sm text-base'}
                                    onClick={() => showClickedContent('assign')}>
                                    Asignador de permisos
                                </Box>) : (<p></p>)}

                            <Box
                                className={selectedSection === 'profile_settings' ? 'bg-blue-800 mt-1 text-white cursor-pointer rounded-sm text-base' : 'bg-blue-500 mt-1 text-white cursor-pointer rounded-sm text-base'}
                                onClick={() => showClickedContent('profile_settings')}>
                                Profile Settings
                            </Box>
                        </Box>

                        <Button sx={{ mt: 4 }} variant="contained" size='small' onClick={handleLogout} color="primary">
                            Cerrar Sesión
                        </Button>
                    </div>

                    <ContentContainer token={token} allAccess={allAccess} selectedSection={selectedSection} id={user.userId} />
                    <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />

                </div>
            ) : (
                <>
                    <Box className={className} p={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <MobileNavMenu token={token} isSettingsRoute={isSettingsRoute} setSelectedSection={setSelectedSection} />
                    </Box>
                    <ContentContainer token={token} allAccess={allAccess} selectedSection={selectedSection} id={user.userId} />
                </>
            )}

        </>
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
