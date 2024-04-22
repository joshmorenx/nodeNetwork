import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import useGetAllUsers from '../hooks/useGetAllUsers';
import ListaNombres from '../components/ListaNombres';
import PermissionDisplayer from '../components/PermissionDisplayer';
import PermissionAssigner from '../components/PermissionAssigner';
import PermissionModifier from '../components/PermissionModifier';
import useGetSelectedUserPermissions from '../hooks/useGetSelectedUserPermissions';
import { useState, useEffect } from 'react';   
import '../assets/styles.css';

export default function PermissionManager({ token }) {
    const [selectedUser, setSelectedUser] = useState('');
    const { user, error } = useGetUser({ token });
    let { allAccess } = usePermissions(user);
    const nombres = [];
    const { userNames } = useGetAllUsers();
    const { UserUnassignedPermissions, UserAssignedPermissions, enviarSolicitud } = useGetSelectedUserPermissions(selectedUser)
    // let previousPermissions = {};

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

    const handleTabClick = async (event) => {
        const index = Array.from(event.currentTarget.parentNode.parentNode.children).indexOf(event.currentTarget.parentNode);
        const permTabContainer = document.querySelector('.permission-tabs');
        const permContent = document.querySelector('.permission-content');
        for(let elem in permTabContainer.children){
            try {
                if(index == elem){
                    permTabContainer.children[elem].children[0].classList = 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                    permContent.children[elem].classList.remove('hidden');
                }else{
                    permTabContainer.children[elem].children[0].classList = 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                    permContent.children[elem].classList.add('hidden');
                }
            } catch (error) {
                //console.log(error);
            }
        }
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
                    <a onClick={handleTabClick} href="#" aria-current="page" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300">Asignar Permisos</a>
                </li>
                <li className="me-2">
                    <a onClick={handleTabClick} href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300">Creador de permisos</a>
                </li>
            </ul>
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
                        <div className='hidden'>
                            <PermissionAssigner ListaNombres={ ListaNombres } nombres={ nombres } handleSelectedChange={handleSelectedChange} PermissionDisplayer={ PermissionDisplayer } token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />
                        </div>
                        <div className='hidden'>
                            <PermissionModifier />
                        </div>
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
