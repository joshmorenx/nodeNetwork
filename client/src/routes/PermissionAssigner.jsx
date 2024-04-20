import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import ListaNombres from '../components/ListaNombres';
import PermissionDisplayer from '../components/PermissionDisplayer';
import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
import { useState, useEffect } from 'react';   
import '../assets/styles.css';
// import '../assets/scripts/index.js';

// import { useEffect } from 'react';
// import { link } from 'react-router-dom';

export default function PermissionAssigner({ token }) {
    const [selectedUser, setSelectedUser] = useState('');
    const { user, error } = useGetUser({ token });
    let { allAccess } = usePermissions(user);
    const nombres = [];
    const { userNames } = useGetAllUsers();
    const { UserUnassignedPermissions, UserAssignedPermissions, enviarSolicitud } = useGetSelectedUserPermissions(selectedUser)
    let previousPermissions = {};

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
    
    const handleSelectedChange = async (selectedValue) => {
        await setSelectedUser(selectedValue)
    }

    const permissionDiff = async (prev, next) => {
        if (await prev !== await next) {
            return true
        } else {
            return false
        }
    }

    const PermissionTabs = () => {
        return(
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="me-2">
                    <a href="#" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Asignar Permisos</a>
                </li>
            </ul>
        )
    }

    useEffect(()=>{
        if(selectedUser !== '' ){
            enviarSolicitud()
        }
    }, [selectedUser]) //error fixed enviarSolicitud function not be added to the array

    useEffect(() => {
        if (selectedUser !== '') {
            if (UserAssignedPermissions) {
                previousPermissions = UserAssignedPermissions;
                // console.log(previousPermissions);
                // console.log(UserAssignedPermissions);
            }
        }
    },[selectedUser, UserAssignedPermissions])
    
    useEffect(() => {
    if (UserAssignedPermissions) {
        // console.log(UserAssignedPermissions);
    }
    }, [UserUnassignedPermissions, UserAssignedPermissions])

    return (
        <div>
            <div className="permission-assigner-container">
                {error ? <p>{error.message}</p> :
                    <PermissionTabs />}
                {allAccess ? (
                    <div> 
                    {/* <p>user: {user.username} </p> */}
                    <ListaNombres nombres={ nombres } handleSelectedChange={handleSelectedChange} UserAssignedPermissions={ UserAssignedPermissions } />
                    </div>
                ):(
                <p></p>)}
            </div>

                <PermissionDisplayer token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />

            {/* <br /> */}
            {/* <br /> */}
            {/* <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={goBackHome}>Volver</button>        */}
        </div>
    )
}

PermissionAssigner.propTypes = {
    token: PropTypes.string.isRequired,
};
