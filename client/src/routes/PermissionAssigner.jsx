import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import ListaNombres from '../components/ListaNombres';
import PermissionDisplayer from '../components/PermissionDisplayer';
import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
import { useState, useEffect } from 'react';   
import '../assets/styles.css';

// import { useEffect } from 'react';
// import { link } from 'react-router-dom';

export default function PermissionAssigner({ token }) {
    let permissions = [];
    const [selectedUser, setSelectedUser] = useState('');
    const { user, error } = useGetUser({ token });
    let { allAccess } = usePermissions(user);
    const nombres = [];
    const { userNames } = useGetAllUsers();
    const { userData, enviarSolicitud } = useGetSelectedUserPermissions(selectedUser)

    try {
        if( userNames.length > 0 ){
            // console.log(userNames);
            userNames.map((user) => {
                // console.log(user.username);
                nombres.push(user.username)
            })            
        }
    } catch (error) {
        console.error(error);
    }
    
    // console.log(cadena, allAccess);
    // const goBackHome = () => {
    //     navigate('/');
    // }
    const handleSelectedChange = (selectedValue) => {
        setSelectedUser(selectedValue)
    }

    useEffect(()=>{
        if(selectedUser !== '' ){
            enviarSolicitud()
        } else {
        }
    }, [selectedUser])
    
    useEffect(() => {
    if (userData) {
        // console.log(userData);
    }
    }, [userData])
    return (
        <div>
            <div className="permission-assigner-container">
                {error ? <p>{error.message}</p> :
                    <h1>Asignador de permisos</h1>}
                {allAccess ? (
                    <div> 
                    {/* <p>user: {user.username} </p> */}
                    <p>puedes modificar permisos</p>
                    <ListaNombres nombres={ nombres } handleSelectedChange={handleSelectedChange} userData={ userData } />
                    </div>
                ):(
                <p></p>)}
            </div>

                <PermissionDisplayer token={ token } userData={ userData }/>

            {/* <br /> */}
            {/* <br /> */}
            {/* <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={goBackHome}>Volver</button>        */}
        </div>
    )
}

PermissionAssigner.propTypes = {
    token: PropTypes.string.isRequired,
};
