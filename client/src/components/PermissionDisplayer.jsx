import PropTypes from 'prop-types';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import useUpdatePermissions from '../hooks/useUpdatePermissions';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button'

export default function PermissionDisplayer({ token, UserUnassignedPermissions, UserAssignedPermissions, selectedUser }) {

  const { user } = useGetCurrentUser({ token });
  let { cadena, allAccess } = usePermissions( user );
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  const [disabledAddPermission, setDisabledAddPermission] = useState(true);
  const [disabledRemovePermission, setDisabledRemovePermission] = useState(true);
  const [ message , setMessage ] = useState('');
  const [permissionAmount, setPermissionAmount] = useState(0);

  const { sendRequest, msg } = useUpdatePermissions(UserAssignedPermissions, selectedUser);
  
  // const [getSelectedUser, setGetSelectedUser] = useState('');
  // const [assignationChanges, setAssignationChanges] = useState(0);
  // const [verifyAssignationChanges, setVerifyAssignationChanges] = useState(false);

  const selectPermission = (permissionId) => {
    setSelectedPermissionId(permissionId);
  }
  
  const getAllPermissions = (permissions, assignationChoosen) => {
    let permissionsArray = [];
  
    for (let key in permissions) {
      // permissionsArray = permissionsArray.concat(permissions[key]);
      permissionsArray.push(permissions[key]);
    }
  
    return permissionsArray.map(permission => (
      <div className={`permissions cursor-pointer m-1 border border-black ${selectedPermissionId === permission.permissionId ? 'bg-orange-500 text-white' : ''}`} key={permission.permissionId} onClick={() => {selectPermission(permission.permissionId); 
        assignationChoosen == 1 ? setDisabledAddPermission(false):setDisabledAddPermission(true); 
        assignationChoosen == 2 ? setDisabledRemovePermission(false):setDisabledRemovePermission(true)}}>
        {permission.permissionId} : {'<'}{permission.permissionName}{'>'}
      </div>
    ));
  }

  const moveFromUnassignedToAssigned = () => {
    const permissionToAdd = UserUnassignedPermissions.find(permission => permission.permissionId === selectedPermissionId);
    
    UserAssignedPermissions.push(permissionToAdd);
    UserUnassignedPermissions.splice(UserUnassignedPermissions.indexOf(permissionToAdd), 1);

    UserUnassignedPermissions.sort((a, b) => (a.permissionId > b.permissionId) ? 1 : -1);
    UserAssignedPermissions.sort((a, b) => (a.permissionId > b.permissionId) ? 1 : -1);
    factoryReset()
  }

  const moveFromAssignedToUnassigned = () => {
    const permissionToRemove = UserAssignedPermissions.find(permission => permission.permissionId === selectedPermissionId);

    UserUnassignedPermissions.push(permissionToRemove);
    UserAssignedPermissions.splice(UserAssignedPermissions.indexOf(permissionToRemove), 1);
    
    UserUnassignedPermissions.sort((a, b) => (a.permissionId > b.permissionId) ? 1 : -1);
    UserAssignedPermissions.sort((a, b) => (a.permissionId > b.permissionId) ? 1 : -1);
    factoryReset()
  }

  
  const factoryReset = () => {
    setSelectedPermissionId(null); 
    setDisabledAddPermission(true);
    setDisabledRemovePermission(true);
  }

  const updatePermissions = () => {
    sendRequest()
  }
  
  useEffect(() => {
    factoryReset()    
  }, [UserUnassignedPermissions, UserAssignedPermissions])

  useEffect(() => { //issue a PR to fix this it causes to show the message only once then it disappears and you have to reload the page in order to see it again
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [msg])

  useEffect(() => {
    if(UserAssignedPermissions.length !== undefined && UserUnassignedPermissions.length !== undefined){
      setPermissionAmount(UserAssignedPermissions.length + UserUnassignedPermissions.length);
    }
  },[UserAssignedPermissions, UserUnassignedPermissions])

  try {
    if(allAccess){  
      return (
        <>
          <div className="available-permissions">
            
            <div style={{ width: '100%'}}>
              <h1>Permisos Disponibles</h1>
              <div className="unassigned-permissions border border-black bg-white" style={{ width: '100%'}}>
                {/* { bArray.map( (item, index) => <div className='m-1 border border-black' key={index} onClick={}>{item}</div> ) } */}
                { getAllPermissions(UserUnassignedPermissions, 1) }
              </div>
            </div>
    
            <div className="btnContainer">
              <div>
                <button onClick={ moveFromUnassignedToAssigned } className='disabled:rounded-sm disabled:bg-gray-300 disabled:text-white rounded-sm bg-blue-500 mb-1 text-white font-bold' id="btnAdd" disabled={disabledAddPermission}> + </button>
              </div>
                
              <div>
                <button onClick={ moveFromAssignedToUnassigned } className='disabled:rounded-sm disabled:bg-gray-300 disabled:text-white rounded-sm bg-blue-500 mb-1 text-white font-bold' id="btnRemove" disabled={disabledRemovePermission}> - </button>
              </div>
            </div>
            
            <div style={{ width: '100%'}}>
              <h1>Permisos Asignados</h1>
              <div className="assigned-permissions border border-black bg-white" style={{ width: '100%'}} id="assigned">
                {/* { cArray.map( (item, index) => <div className='m-1 border border-black' key={index}>{item}</div> ) } */}
                { getAllPermissions(UserAssignedPermissions, 2) }
              </div>
            </div>

          </div>
          
          {/* <button onClick={updatePermissions} className='p-2 rounded-sm bg-blue-500 font-bold disabled:p-2 disabled:rounded-sm disabled:bg-slate-500 text-white mt-10' id="btnSave" >Guardar Cambios</button> */}

          <Button disabled={!permissionAmount} onClick={ updatePermissions } size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                Guardar Cambios
          </Button>

          <p className='mt-10 bg-black text-white'> {message} </p>
          
        </>
      ); 
    } else  {
      return(
        <>{ cadena }</>
      )
    } 
  } catch (error) {
    //console.error(error);
  }
}

PermissionDisplayer.propTypes = {
  token: PropTypes.string.isRequired,
}