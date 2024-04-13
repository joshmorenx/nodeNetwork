import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import { useState } from 'react';

export default function PermissionDisplayer({ token, UserUnassignedPermissions, UserAssignedPermissions}) {

  const { user } = useGetUser({ token });
  let { cadena, allAccess } = usePermissions( user );
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);

  const selectPermission = (permissionId) => {
    setSelectedPermissionId(permissionId);
  }
  
  const getAllPermissions = (permissions) => {
    let permissionsArray = [];
  
    // Combinar permisos asignados y no asignados en un solo array
    for (let key in permissions) {
      permissionsArray = permissionsArray.concat(permissions[key]);
    }
  
    return permissionsArray.map(permission => (
      <div 
        className={`permissions cursor-pointer m-1 border border-black ${selectedPermissionId === permission.permissionId ? 'bg-gray-400 text-white' : ''}`} 
        key={permission.permissionId} 
        onClick={() => selectPermission(permission.permissionId)}
      >
        {permission.permissionId} : {'<'}{permission.permissionDescription}{'>'}
      </div>
    ));
  }

  try {
    if(allAccess){  
      return (
        <>
          <div className="available-permissions">
            <h1>Permisos Disponibles</h1>
            <div className="unassigned-permissions border border-black">
              {/* { bArray.map( (item, index) => <div className='m-1 border border-black' key={index} onClick={}>{item}</div> ) } */}
              { getAllPermissions(UserUnassignedPermissions) }
            </div>
    
            <div className="btnContainer">
              <div>
                <button className='rounded-sm bg-blue-500 mb-1 text-white font-bold' id="btnAdd">+</button>
              </div>
                
              <div>
                <button className='rounded-sm bg-blue-500 text-white' id="btnRemove">-</button>
              </div>
            </div>
            
            <h1>Permisos Asignados</h1>
            <div className="assigned-permissions border border-black">
              {/* { cArray.map( (item, index) => <div className='m-1 border border-black' key={index}>{item}</div> ) } */}
              { getAllPermissions(UserAssignedPermissions) }
            </div>
          </div>
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