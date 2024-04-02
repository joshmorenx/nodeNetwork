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
        // if(logStatusRefresh){
        //     window.location.reload();
        // }
        // window.location.reload();
    };
    // const getPermissions = () => {
    //     try {
    //         let cadena = ''
    //             for(let key in user.permissions){
    //             let elem = user.permissions[key]
    //                 if(key < user.permissions.length - 1){ 
    //                     cadena += elem.permissionDescription+", "
    //                 }else{
    //                     cadena += elem.permissionDescription
    //                 }

    //                 if(elem.permissionId === 1){
    //                     hasAdminPermissions = true
    //                 }
    //             }
    //         // console.log(cadena)
    //         if(user.permissions.length > 0) {
    //             return cadena
    //         }
    //         return 'Sin permisos'
    //     } catch (error) {
    //         // console.log(error);
    //     }
    // }
    
    let { cadena, allAccess } = usePermissions(user)
    // console.log(cadena);

    return (
        <div>
            <h1>Dashboard</h1>
            {error ? (
                <p>Error al obtener el contenido del usuario: {error.message}</p>
            ) : (
                <p>
                    Hola, Bienvenido {user.username}
                    <br />
                    Correo: {user.email}
                    <br />
                    Permisos de usuario: {cadena}
                </p>
            )}
            <br />
            <button onClick={handleLogout}>Cerrar Sesión</button>
            <br />
            <br />
            {allAccess ? (
                <button onClick={() => navigate('/permissions')}>Asignador de permisos</button>
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
