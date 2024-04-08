import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import ListaNombres from './ListaNombres';
import PermissionDisplayer from '../components/PermissionDisplayer';
// import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
// import { useNavigate } from 'react-router';
import '../assets/styles.css';

// import { useEffect } from 'react';
// import { link } from 'react-router-dom';

export default function PermissionAssigner({ token }) {
    let selectedUserName = ''
    const { user, error } = useGetUser({ token });
    let { allAccess } = usePermissions(user);
    // const navigate = useNavigate();
    // const nombres = ['Juan', 'María', 'Pedro', 'Ana'];
    const nombres = [];
    const { userNames } = useGetAllUsers();
    // const {} = useGetSelectedUserPermissions(selectedUserName); //hacer la funcion para obtener los permisos de un usuario
    
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
    // const goBackHome = () => {
    //     navigate('/');
    // }
    const setSelectedUserPermissions = () => {
        selectedUserName = document.querySelector('select').value
    }

    return (
        <div>
            {error ? <p>{error.message}</p> :
                <h1>Asignador de permisos</h1>}
            {allAccess ? (
                <div> 
                {/* <p>user: {user.username} </p> */}
                <p>puedes modificar permisos</p>
                <ListaNombres nombres={ nombres } /> <button onClick={setSelectedUserPermissions} className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded'> Consultar permismos del usuario </button>
                </div>
            ):(
            <p></p>)}

                <PermissionDisplayer token={ token } />

            {/* <br /> */}
            {/* <br /> */}
            {/* <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={goBackHome}>Volver</button>        */}
        </div>
    )
}

PermissionAssigner.propTypes = {
    token: PropTypes.string.isRequired,
};
