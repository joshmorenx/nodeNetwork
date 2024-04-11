import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';

export default function PermissionDisplayer({ token, UserUnassignedPermissions, UserAssignedPermissions}) {

  const { user } = useGetUser({ token });
  let { cadena, allAccess } = usePermissions( user );
  // let cadenaArray = cadena.split(', ');  

  // let bArray = [];
  // let cArray = [];
  
  const selectPermission = (event) => {
    console.log(event.target.textContent);

    //bg-gray-900 text-white
  }
  
  const getAllPermissions = (permissions) => {
    let bArray = [];
    for(let elem in permissions){
      bArray.push(<div className='cursor-pointer m-1 border border-black' key={elem} onClick={selectPermission}>{permissions[elem].permissionId} : {'<'}{permissions[elem].permissionDescription}{'>'}</div>);
    }
    return bArray
  }

    // for(let elem in UserUnassignedPermissions){
    //   bArray.push(UserUnassignedPermissions[elem].permissionId +' : '+ '<'+UserUnassignedPermissions[elem].permissionDescription+'>');
    // }
    
    // for(let elem in UserAssignedPermissions){
    //   cArray.push(UserAssignedPermissions[elem].permissionId +' : '+ '<'+UserAssignedPermissions[elem].permissionDescription+'>');
    // }

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