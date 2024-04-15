import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
// import useUpdatePermissions from '../hooks/useUpdatePermissions';
import { useState, useEffect } from 'react';

export default function PermissionDisplayer({ token, UserUnassignedPermissions, UserAssignedPermissions, selectedUser }) {

  const { user } = useGetUser({ token });
  let { cadena, allAccess } = usePermissions( user );
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  const [disabledAddPermission, setDisabledAddPermission] = useState(true);
  const [disabledRemovePermission, setDisabledRemovePermission] = useState(true);

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
      <div className={`permissions cursor-pointer m-1 border border-black ${selectedPermissionId === permission.permissionId ? 'bg-gray-400 text-white' : ''}`} key={permission.permissionId} onClick={() => {selectPermission(permission.permissionId); 
        assignationChoosen == 1 ? setDisabledAddPermission(false):setDisabledAddPermission(true); 
        assignationChoosen == 2 ? setDisabledRemovePermission(false):setDisabledRemovePermission(true)}}>
        {permission.permissionId} : {'<'}{permission.permissionDescription}{'>'}
      </div>
    ));
  }

  const moveFromUnassignedToAssigned = () => {
    //move from .unassigned-permissions to .assigned-permissions
    const permissionToAdd = UserUnassignedPermissions.find(permission => permission.permissionId === selectedPermissionId);
    UserAssignedPermissions.push(permissionToAdd);
    UserUnassignedPermissions.splice(UserUnassignedPermissions.indexOf(permissionToAdd), 1);
    factoryReset()
  }

  const moveFromAssignedToUnassigned = () => {
    const permissionToRemove = UserAssignedPermissions.find(permission => permission.permissionId === selectedPermissionId);
    UserUnassignedPermissions.push(permissionToRemove);
    UserAssignedPermissions.splice(UserAssignedPermissions.indexOf(permissionToRemove), 1);
    factoryReset()
  }

  // const { updatePermissionsResponse } = useUpdatePermissions(selectedUser);

  const factoryReset = () => {
    setSelectedPermissionId(null); 
    setDisabledAddPermission(true);
    setDisabledRemovePermission(true);
  }

  useEffect(() => {
    factoryReset()
  }, [UserUnassignedPermissions, UserAssignedPermissions])

  try {
    if(allAccess){  
      return (
        <>
          <div className="available-permissions">
            <h1>Permisos Disponibles</h1>
            <div className="unassigned-permissions border border-black">
              {/* { bArray.map( (item, index) => <div className='m-1 border border-black' key={index} onClick={}>{item}</div> ) } */}
              { getAllPermissions(UserUnassignedPermissions, 1) }
            </div>
    
            <div className="btnContainer">
              <div>
                <button onClick={ moveFromUnassignedToAssigned } className='disabled:rounded-sm disabled:bg-gray-300 disabled:text-white rounded-sm bg-blue-500 mb-1 text-white font-bold' id="btnAdd" disabled={disabledAddPermission}> + </button>
              </div>
                
              <div>
                <button onClick={ moveFromAssignedToUnassigned } className='disabled:rounded-sm disabled:bg-gray-300 disabled:text-white rounded-sm bg-blue-500 mb-1 text-white font-bold' id="btnRemove" disabled={disabledRemovePermission}> - </button>
              </div>
            </div>
            
            <h1>Permisos Asignados</h1>
            <div className="assigned-permissions border border-black">
              {/* { cArray.map( (item, index) => <div className='m-1 border border-black' key={index}>{item}</div> ) } */}
              { getAllPermissions(UserAssignedPermissions, 2) }
            </div>
          </div>
          <button className='p-2 rounded-sm bg-slate-500 text-white mt-10' id="btnSave" disabled>Guardar Cambios</button>
        </>
      ); 
    } else  {
      return(
        <>{ cadena }</>
      )
    } 
  } catch (error) {
    console.error(error);
  }
}

PermissionDisplayer.propTypes = {
  token: PropTypes.string.isRequired,
}