import PropTypes from 'prop-types';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import useGetAllPermissions from '../hooks/useGetAllPermissions';
import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
import PermissionAssigner from './PermissionAssigner';
import PermissionModifier from './PermissionModifier';
import PermissionCreateOrDelete from './PermissionCreateOrDelete';
import { useState, useEffect } from 'react';   
import { Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import '../assets/styles.css';

export default function PermissionManager({ token }) {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');
    const { user, error } = useGetCurrentUser({ token });
    let { allAccess } = usePermissions(user);
    const nombres = [];
    const { userNames } = useGetAllUsers();
    const { permissionDetails, errorDetails, sendRequestedPermissions } = useGetAllPermissions();
    const { UserUnassignedPermissions, UserAssignedPermissions, enviarSolicitud } = useGetSelectedUserPermissions(selectedUser)
    const [selectedTab, setSelectedTab] = useState('');
    const [delBtnClicked, setDelBtnClicked] = useState(false);
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const desktopStyle = className+" permission-tabs flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
    const mobileStyle = className+" permission-tabs flex flex-col text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"

    // let's make a trigger when delBtnClicked is true useGetAllPermissions will be called again (PREPARATION)
    // useEffect(() => {
    //     console.log(delBtnClicked);
    //     if(delBtnClicked) {
    //         alert('deletion button clicked');
    //         sendRequestedPermissions()
    //     }
    //     setDelBtnClicked(false)
    // }, [delBtnClicked])

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
        if(tab === 'modify' || tab === 'create') {
            setSelectedPermission('')
        }
    }

    useEffect(() => {
        (selectedTab === 'assign' ? setSelectedUser('') : ((selectedTab === 'modify' || selectedTab === 'create') ? sendRequestedPermissions() : null))
    }, [selectedTab])

    const permissionDiff = async (prev, next) => {
        if (await prev !== await next) {
            return true
        } else {
            return false
        }
    }

    const PermissionTabs = () => {
        return(
            <ul className={isDesktop ? desktopStyle : mobileStyle}>
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
            <Typography>Debe seleccionar una pestaña</Typography>
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

                        { selectedTab === 'assign' && (<PermissionAssigner nombres={ nombres } handleSelectedChange={handleSelectedChange} token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />)}

                        { selectedTab === 'modify' && (<PermissionModifier permissionDetails={ permissionDetails } handleSelectedChange={handleSelectedChange} token={ token } selectedPermission={ selectedPermission } />) }
                        
                        { selectedTab === 'create' && (<PermissionCreateOrDelete permissionDetails={ permissionDetails } handleSelectedChange={handleSelectedChange} token={ token } selectedPermission={ selectedPermission } setDelBtnClicked={ setDelBtnClicked } sendRequestedPermissions={ sendRequestedPermissions } delBtnClicked={ delBtnClicked } />) }

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