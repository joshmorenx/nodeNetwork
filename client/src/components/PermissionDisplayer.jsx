import PropTypes from 'prop-types';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';

export default function PermissionDisplayer({ token }) {

  const { user } = useGetUser({ token });
  let { cadena, allAccess } = usePermissions(user);
  try {
    if(allAccess){
      return (
        <>
          <div className="PermissionContainer">
            <div className="myDiv">
              <div>Permiso de ejemplo 1</div>
              <div>Permiso de ejemplo 2</div>
              <div>Permiso de ejemplo 3</div>
              <div>Permiso de ejemplo 4</div>
              <div>Permiso de ejemplo 5</div>
            </div>
    
            <div className="btnContainer">
              <div>
                <button id="btnAdd">+</button>
              </div>
    
              <div>
                <button id="btnRemove">-</button>
              </div>
            </div>
            
            <div className="myDiv">
              <div>Permiso de ejemplo 1</div>
              <div>Permiso de ejemplo 2</div>
              <div>Permiso de ejemplo 3</div>
              <div>Permiso de ejemplo 4</div>
              <div>Permiso de ejemplo 5</div>
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