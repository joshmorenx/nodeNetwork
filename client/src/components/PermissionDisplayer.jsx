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
          <div className="PermissionContainer">
            <div className="unassigned-permissions border border-black">
              <div>Permiso de ejemplo 1</div>
              <div>Permiso de ejemplo 2</div>
              <div>Permiso de ejemplo 3</div>
              <div>Permiso de ejemplo 4</div>
              <div>Permiso de ejemplo 5</div>
            </div>
    
            <div className="btnContainer">
              <div>
                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded' id="btnAdd">+</button>
              </div>
    
              <div>
                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded' id="btnRemove">-</button>
              </div>
            </div>
            
            <div className="assigned-permissions border border-black">
            { cadenaArray.map( (item, index) => <div className='' key={index}>{item}</div> ) }
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