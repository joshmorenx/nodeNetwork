import PropTypes from 'prop-types';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import useGetAllPermissions from '../hooks/useGetAllPermissions';
import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
import ListaNombres from './ListaNombres';
import PermissionDisplayer from './PermissionDisplayer';
import PermissionAssigner from './PermissionAssigner';
import PermissionModifier from './PermissionModifier';
import PermissionCreateOrDelete from './PermissionCreateOrDelete';
import ListaPermisos from './ListaPermisos';
import PermissionDescriptionDetails from './PermissionDescriptionDetails';
import PermissionDel from './PermissionDel';
import PermissionAdd from './PermissionAdd';
import { useState, useEffect } from 'react';   
import '../assets/styles.css';

export default function PermissionManager({ token }) {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');
    const { user, error } = useGetCurrentUser({ token });
    let { allAccess } = usePermissions(user);
    const nombres = [];
    const { userNames } = useGetAllUsers();
    const { permissionDetails } = useGetAllPermissions();
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
    
    const handleSelectedChange = async (selectedValue, type) => {
        if(type === 'user') {
            await setSelectedUser(selectedValue)
        }
        else if(type === 'permission') {
            await setSelectedPermission(selectedValue)
        }
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
    }, [selectedUser]) 

    return (
        <div>
            <div className="permission-manager-container">
                {error ? <p>{error.message}</p> :
                    <PermissionTabs />}
                {allAccess ? (
                    <div className="permission-content"> 

                        { selectedTab === 'assign' && (<PermissionAssigner ListaNombres={ ListaNombres } nombres={ nombres } handleSelectedChange={handleSelectedChange} PermissionDisplayer={ PermissionDisplayer } token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />)}

                        { selectedTab === 'modify' && (<PermissionModifier ListaPermisos={ ListaPermisos } permissionDetails={ permissionDetails } handleSelectedChange={handleSelectedChange} PermissionDescriptionDetails={ PermissionDescriptionDetails } token={ token } selectedPermission={ selectedPermission } />) }
                        
                        { selectedTab === 'create' && (<PermissionCreateOrDelete ListaPermisos={ ListaPermisos } permissionDetails={ permissionDetails } handleSelectedChange={handleSelectedChange} PermissionDel={ PermissionDel } PermissionAdd={ PermissionAdd } token={ token } selectedPermission={ selectedPermission } />) }

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