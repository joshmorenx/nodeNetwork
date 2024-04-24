import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import ListaNombres from '../components/ListaNombres';
import PermissionDisplayer from '../components/PermissionDisplayer';
import PermissionAssigner from '../components/PermissionAssigner';
import PermissionModifier from '../components/PermissionModifier';
import PermissionCreation from '../components/PermissionCreation';
import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
import ListaPermisos from '../components/ListaPermisos';
import PermissionDetails from '../components/PermissionDetails';
import { useState, useEffect } from 'react';   
import '../assets/styles.css';

export default function PermissionManager({ token }) {
    const [selectedUser, setSelectedUser] = useState('');
    const { user, error } = useGetUser({ token });
    let { allAccess } = usePermissions(user);
    const nombres = [];
    const { userNames } = useGetAllUsers();
    const { UserUnassignedPermissions, UserAssignedPermissions, enviarSolicitud } = useGetSelectedUserPermissions(selectedUser)
    const [selectedTab, setSelectedTab] = useState('');

    try {
        if( userNames.length > 0 ){
            userNames.map((user) => {
                nombres.push(user.username)
            })            
        }
    } catch (error) {
        console.error(error);
    }
    
    const handleSelectedChange = async (selectedValue) => {
        await setSelectedUser(selectedValue)
    }

    const handleTabClick = async (tab) => {
        setSelectedTab(tab)
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
            <ul className="permission-tabs flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="me-2">
                    <a onClick={()=>handleTabClick('assign')} href="#" className={ selectedTab === 'assign' ? 'inline-block p-4 dark:bg-gray-800 text-blue-600 rounded-t-lg dark:text-blue-500' : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300' }>Asignar Permisos</a>
                </li>
                <li className="me-2">
                    <a onClick={()=>handleTabClick('modify')} href="#" className={ selectedTab === 'modify' ? 'inline-block p-4 dark:bg-gray-800 text-blue-600 rounded-t-lg dark:text-blue-500' : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300' }>Modificar Permisos</a>
                </li>
                <li>
                    <a onClick={()=>handleTabClick('create')} href="#" className={ selectedTab === 'create' ? 'inline-block p-4 dark:bg-gray-800 text-blue-600 rounded-t-lg dark:text-blue-500' : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300' }>Crear/Eliminar Permisos</a>
                </li>
            </ul>
        )
    }

    const NonSelectedTab = () => {
        return(
            <div><p>Debe seleccionar una pestaña</p></div>
        )    
    }

    useEffect(()=>{
        if(selectedUser !== '' ){
            enviarSolicitud()
        }
    }, [selectedUser]) //error fixed enviarSolicitud function not be added to the array

    return (
        <div>
            <div className="permission-manager-container">
                {error ? <p>{error.message}</p> :
                    <PermissionTabs />}
                {allAccess ? (
                    <div className="permission-content"> 
                        {/* <p>user: {user.username} </p> */}
                        { selectedTab === 'assign' && (<PermissionAssigner ListaNombres={ ListaNombres } nombres={ nombres } handleSelectedChange={handleSelectedChange} PermissionDisplayer={ PermissionDisplayer } token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />)}

                        { selectedTab === 'modify' && (<PermissionModifier ListaPermisos={ ListaPermisos } handleSelectedChange={handleSelectedChange} PermissionDetails={ PermissionDetails } token={ token } />) }
                        
                        { selectedTab === 'create' && (<PermissionCreation />) }
                        { selectedTab === '' && (<NonSelectedTab />) }
                    </div>                    
                ):(
                <p></p>)}
            </div>
        </div>
    )
}

PermissionManager.propTypes = {
    token: PropTypes.string.isRequired,
};