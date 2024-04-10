import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import { useState, useEffect } from 'react';

export default function PermissionDisplayer({ token, UserAssignedPermissions, UserUnasignedPermissions }) {

  const { user } = useGetUser({ token });
  let { cadena, allAccess } = usePermissions( user );
  // let cadenaArray = cadena.split(', ');  
  let cadenaArray = []
  let cArray = [];

  let aArray = [];
  let bArray = [];


    for(let elem in UserAssignedPermissions){
      cArray.push(UserAssignedPermissions[elem].permissionId +' : '+ '<'+UserAssignedPermissions[elem].permissionDescription+'>');
    }

    for(let elem in UserUnasignedPermissions){
      bArray.push(UserUnasignedPermissions[elem].permissionId +' : '+ '<'+UserUnasignedPermissions[elem].permissionDescription+'>');
    }

    aArray = bArray
    cadenaArray = cArray;
  try {
    if(allAccess){
      return (
        <>
          <div className="available-permissions">
            <h1>Permisos Disponibles</h1>
            <div className="assigned-permissions border border-black">
              { aArray.map( (item, index) => <div className='m-1 border border-black' key={index}>{item}</div> ) }
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
              { cadenaArray.map( (item, index) => <div className='m-1 border border-black' key={index}>{item}</div> ) }
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