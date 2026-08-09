import PropTypes from 'prop-types';
import { useState } from 'react';
import useLogout from '../hooks/useLogout';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import UserCard from '../components/UserCard';
import ContentContainer from '../components/ContentContainer';
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ImageViewer from '../components/ImageViewer';
import { useMediaQuery } from '@mui/material';
import MobileNavMenu from '../components/MobileNavMenu';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import FeedIcon from '@mui/icons-material/Feed';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import '../assets/styles.css';

const Dashboard = ({ token }) => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('profile_settings');
    const [imgClickedPath, setImgClickedPath] = useState(null)
    const isSettingsRoute = true
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');

    const { logout } = useLogout(token);

    const { user, error } = useGetCurrentUser({ token }); // must gather the profile image here
    const handleLogout = () => {
        logout()
    };

    let { cadena, allAccess } = usePermissions(user)

    const isAdmin = (allAccess || user.userId === 1)

    const showClickedContent = (section) => {
        setSelectedSection(section);
    }

    const handleImageClicked = (event) => {
        if (event) {
            setImgClickedPath(event.target.src);
        }
    }

    const sectionTitle = selectedSection === 'assign' ? 'Asignador de permisos' : 'Ajustes de perfil';
    const sectionSubtitle = selectedSection === 'assign'
        ? 'Gestiona los permisos de los usuarios de la plataforma'
        : 'Actualiza tus datos personales y foto de perfil';

    const NavButtons = () => (
        <nav className="dash-nav">
            <button type="button" className="dash-nav-btn" onClick={() => navigate('/feed')}>
                <FeedIcon /> Feed
            </button>

            {isAdmin && (
                <button
                    type="button"
                    className={`dash-nav-btn${selectedSection === 'assign' ? ' is-active' : ''}`}
                    onClick={() => showClickedContent('assign')}
                >
                    <AdminPanelSettingsIcon /> Asignador de permisos
                </button>
            )}

            <button
                type="button"
                className={`dash-nav-btn${selectedSection === 'profile_settings' ? ' is-active' : ''}`}
                onClick={() => showClickedContent('profile_settings')}
            >
                <ManageAccountsIcon /> Ajustes de perfil
            </button>
        </nav>
    )

    return (
        <>
            <Helmet>
                <title>Dashboard - Node Network</title>
            </Helmet>
            {isDesktop ? (
                <div className={`dashboard-container ${className}`}>
                    <aside className={`dashboard-sidebar ${className}`}>
                        <Box className="dashboard-sidebar-head">
                            <Box className="dashboard-sidebar-logo">
                                <DashboardCustomizeIcon />
                            </Box>
                            <Box>
                                <Typography className="dashboard-sidebar-title">Panel de control</Typography>
                                <Typography className="dashboard-sidebar-sub">
                                    {isAdmin ? 'Administrador' : 'Usuario'}
                                </Typography>
                            </Box>
                        </Box>

                        <div>
                            {error ? (
                                <p>Error al obtener el contenido del usuario: {error.message}</p>
                            ) : (
                                <UserCard user={user} allAccess={allAccess} cadena={cadena} handleImageClicked={handleImageClicked} id={user.userId} />
                            )}
                        </div>

                        <NavButtons />

                        <button type="button" className="dash-logout" onClick={handleLogout}>
                            <LogoutIcon /> Cerrar Sesión
                        </button>
                    </aside>

                    <main className={`dashboard-main ${className}`}>
                        <Box className="dashboard-main-header">
                            <Box>
                                <Typography className="dashboard-main-title">{sectionTitle}</Typography>
                                <Typography className="dashboard-main-sub">{sectionSubtitle}</Typography>
                            </Box>
                        </Box>
                        <ContentContainer token={token} allAccess={allAccess} selectedSection={selectedSection} id={user.userId} />
                    </main>

                    <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
                </div>
            ) : (
                <>
                    <Box className={`dashboard-mobile ${className}`}>
                        <Box className={`dashboard-mobile-bar ${className}`}>
                            <Typography variant="h6" className="dashboard-mobile-title">Panel de control</Typography>
                            <MobileNavMenu token={token} isSettingsRoute={isSettingsRoute} setSelectedSection={setSelectedSection} />
                        </Box>
                        <Box className="dashboard-mobile-body">
                            <ContentContainer token={token} allAccess={allAccess} selectedSection={selectedSection} id={user.userId} />
                        </Box>
                    </Box>
                </>
            )}

        </>
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
