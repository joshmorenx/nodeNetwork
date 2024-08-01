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

const Dashboard = ({ token }) => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState('assign');
    const [imgClickedPath, setImgClickedPath] = useState(null)

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
        if(event){
            setImgClickedPath(event.target.src);
        }
    }

    return (
        <>
            <div className="dashboard-container">
                <div className="profile-container bgx-black text-center">
                    <div>
                        {error ? (
                            <p>Error al obtener el contenido del usuario: {error.message}</p>
                        ) : (
                            <UserCard user={user} allAccess={allAccess} cadena={cadena} handleImageClicked={handleImageClicked} />
                        )}
                    </div>
                    
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
        <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
        </> 
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
