import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import ListaNombres from './ListaNombres';
import PermissionDisplayer from './PermissionDisplayer';
import { useNavigate } from 'react-router';
// import { useEffect } from 'react';
// import { link } from 'react-router-dom';

export default function PermissionAssigner({ token }) {
    const { user, error } = useGetUser({ token });
    let { cadena, allAccess } = usePermissions(user);
    const navigate = useNavigate();
    // const nombres = ['Juan', 'María', 'Pedro', 'Ana'];
    const nombres = [];
    const { userNames } = useGetAllUsers();
    
    try {
        if( userNames.length > 0 ){
            // console.log(userNames);
            userNames.map((user) => {
                // console.log(user.username);
                nombres.push(user.username)
            })            
        }
    } catch (error) {
        console.log(error);
    }
    // console.log(cadena, allAccess);
    const goBackHome = () => {
        navigate('/');
    }
    
    return (
        <div>
            {error ? <p>{error.message}</p> :<h1>Asignador de permisos</h1>}
            {allAccess ? (
                <div> 
                <p>user: {user.username} </p>
                <p>puedes modificar permisos</p>
                <ListaNombres nombres={ nombres } /> <button> Consultar permismos del usuario </button>
                </div>
            ):(
            <p>{cadena}</p>)}
            <br />
            <PermissionDisplayer />
            <br />
            <button onClick={goBackHome}>Volver</button>       
        </div>
    )
}

PermissionAssigner.propTypes = {
    token: PropTypes.string.isRequired,
};
