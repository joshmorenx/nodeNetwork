import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';

export default function PermissionDisplayer({ token }) {

  const { user } = useGetUser({ token });
  let { cadena, allAccess } = usePermissions( user );
  let cadenaArray = cadena.split(', ');  

  try {
    if(allAccess){
      return (
        <>
          <div className="available-permissions">
            <div className="unassigned-permissions border border-black">
              <div className='m-1 border border-black'>Permiso de ejemplo 1</div>
              <div className='m-1 border border-black'>Permiso de ejemplo 1</div>
              <div className='m-1 border border-black'>Permiso de ejemplo 1</div>
              <div className='m-1 border border-black'>Permiso de ejemplo 1</div>
              <div className='m-1 border border-black'>Permiso de ejemplo 1</div>
              <div className='m-1 border border-black'>Permiso de ejemplo 1</div>
            </div>
    
            <div className="btnContainer">
              <div>
                <button className='rounded-sm bg-blue-500 mb-1 text-white font-bold' id="btnAdd">+</button>
              </div>
                
              <div>
                <button className='rounded-sm bg-blue-500 text-white' id="btnRemove">-</button>
              </div>
            </div>
            
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