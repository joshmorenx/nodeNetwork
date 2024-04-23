import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import UserCard from '../components/UserCard';
import ContentContainer from '../components/ContentContainer';
// import { useNavigate } from 'react-router';

const Dashboard = ({ token }) => {
    const [selectedSection, setSelectedSection] = useState('feed');
    useEffect(() => {
        // console.log('Token:', token);
    }, [token]);

    const { logout, logStatusRefresh } = useLogout(token);

    if(logStatusRefresh){
        window.location.reload();
    }
    const { user, error } = useGetUser({ token });
    const handleLogout = () => {
        logout()
    };
    
    let { cadena, allAccess } = usePermissions(user)

    const showClickedContent = (section) => {
        setSelectedSection(section);
    }

    return (
        <>
            <div className="dashboard-container" style={{ paddingRight: '2vw' }}>
                <div className="profile-container text-center">
                    <div>
                        {error ? (
                            <p>Error al obtener el contenido del usuario: {error.message}</p>
                        ) : (
                            <UserCard user={user} allAccess={allAccess} cadena={cadena} />
                        )}

                        <button className='logout-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded' onClick={handleLogout}>Cerrar Sesión</button>

                    </div>

                    <div className='sections-container mt-5'>
                        <div onClick={()=>showClickedContent('feed')} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Feed </div>
                        {allAccess ? (<div onClick={()=>showClickedContent('assign')} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Asignador de permisos </div>):(<p></p>) }
                        <div onClick={()=>showClickedContent('pages')} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Pages </div>
                    </div>
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
