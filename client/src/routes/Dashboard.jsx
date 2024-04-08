import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useLogout from '../hooks/useLogout';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
// import { useNavigate } from 'react-router';
import PermissionAssigner from '../routes/PermissionAssigner';

const Dashboard = ({ token }) => {
    // let navigate = useNavigate();    
    useEffect(() => {
        // console.log('Token:', token);
    }, [token]);

    // const logout = useLogout();
    const { logout, logStatusRefresh } = useLogout(token);

    if(logStatusRefresh){
        window.location.reload();
    }
    const { user, error } = useGetUser({ token });
    // let hasAdminPermissions = false
    const handleLogout = () => {
        logout()
    };
    
    let { cadena, allAccess } = usePermissions(user)
    // console.log(cadena);

    return (
        <>
            <div className="dashboard-container">
                <div className="profile-container text-center">
                    {error ? (
                        <p>Error al obtener el contenido del usuario: {error.message}</p>
                    ) : (
                            <div className="m-auto">
                                <div className='profile-card m-auto rounded-3xl bg-gray-200'>
                                    {/* Hola, Bienvenido {user.username} */}
                                    <div className="avatar-container rounded-3xl">
                                        <img className="avatar m-auto w-100 h-100 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
                                    </div>

                                    <div className='user-data'>
                                        <p>{user.firstName} {user.lastName}</p>
                                        <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
                                    </div>

                                    {allAccess ?
                                        (
                                        <div className="user-type bg-blue-500 text-white font-bold py-1 px-2 border-blue-700 rounded">
                                            <b>{ cadena ? ("Administrador"):(1) }</b>
                                        </div>
                                        ):(
                                            <p>No tienes permisos de administrador</p>)}
                                </div>
                            </div>
                    )}
                        <button className='logout-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded' onClick={handleLogout}>Cerrar Sesión</button>
                </div>
                
                <div className='permission-container'>
                    <PermissionAssigner token={token} />
                </div>
            </div>
        </> 
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
