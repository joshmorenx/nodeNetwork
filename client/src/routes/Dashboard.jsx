import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import UserCard from '../components/UserCard';
import ContentContainer from '../components/ContentContainer';
import { Button, Box } from '@mui/material/'
import { useNavigate } from 'react-router-dom';
import FeedNavbar from '../components/FeedNavbar';
// import { useNavigate } from 'react-router';

const Dashboard = ({ token }) => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('assign');
    useEffect(() => {
        // console.log('Token:', token);||
    }, [token]);

    const { logout } = useLogout(token);

    // useEffect(() => {
    //     if(logStatusRefresh){
    //         window.location.reload();
    //     }
    // }, [logStatusRefresh]);

    const { user, error } = useGetCurrentUser({ token });
    const handleLogout = () => {
        logout()
    };
    
    let { cadena, allAccess } = usePermissions(user)

    const showClickedContent = (section) => {
        setSelectedSection(section);
    }

    return (
        <>
        <FeedNavbar token={token} />
            <div className="dashboard-container" style={{ paddingRight: '2vw' }}>
                <div className="profile-container text-center">
                    <div>
                        {error ? (
                            <p>Error al obtener el contenido del usuario: {error.message}</p>
                        ) : (
                            <UserCard user={user} allAccess={allAccess} cadena={cadena} />
                        )}

                        {/* <button className='logout-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded' onClick={handleLogout}>Cerrar Sesión</button> */}

                    </div>

                    {/* <div className='sections-container mt-5'>
                        <div onClick={()=>showClickedContent('feed')} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Feed </div>
                        {allAccess ? (<div onClick={()=>showClickedContent('assign')} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Asignador de permisos </div>):(<p></p>) }
                        <div onClick={()=>showClickedContent('pages')} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Pages </div>
                    </div> */}
                    
                    <Box className='sections-container mt-5' sx={{ mt: 4 }}>
                        <Box 
                            className={selectedSection === 'feed' ? 'bg-blue-800 mt-1 text-white cursor-pointer rounded-sm text-base' : 'bg-blue-500 mt-1 text-white cursor-pointer rounded-sm text-base'}
                            // onClick={()=>showClickedContent('feed')}>
                            onClick={()=>navigate('/feed')}>
                            Feed
                        </Box>

                        {allAccess ? (
                        <Box 
                            className={selectedSection === 'assign' ? 'bg-blue-800 mt-1 text-white cursor-pointer rounded-sm text-base' : 'bg-blue-500 mt-1 text-white cursor-pointer rounded-sm text-base'}
                            onClick={()=>showClickedContent('assign')}>
                                Asignador de permisos
                            </Box>):(<p></p>) }

                        <Box
                            className={selectedSection === 'profile_settings' ? 'bg-blue-800 mt-1 text-white cursor-pointer rounded-sm text-base' : 'bg-blue-500 mt-1 text-white cursor-pointer rounded-sm text-base'}
                            onClick={()=>showClickedContent('profile_settings')}>
                                Profile Settings
                        </Box>
                    </Box>

                    <Button sx={{ mt: 4 }} variant="contained" size='small' onClick={handleLogout} color="primary">
                        Cerrar Sesión
                    </Button>
                </div>
                
                <ContentContainer token={token} allAccess={allAccess} selectedSection={selectedSection}/>

            </div>
        </> 
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
