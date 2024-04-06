import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useLogout from '../hooks/useLogout';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import { useNavigate } from 'react-router';

const Dashboard = ({ token }) => {
    let navigate = useNavigate();
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
        <div>
            {error ? (
                <p>Error al obtener el contenido del usuario: {error.message}</p>
            ) : (
                <div class="flex h-screen">
                    <div class="m-auto">
                        <p>
                            Hola, Bienvenido {user.username}
                            <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
                            <br />
                            Correo: {user.email}
                            <br />
                            Permisos de usuario: {cadena}
                        </p>
                    </div>
                </div>
            )}
            <br />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogout}>Cerrar Sesión</button>
            <br />
            <br />
            {allAccess ? (
                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={() => navigate('/permissions')}>Asignador de permisos</button>
            ):(
                ""
            )}
        </div> 
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
