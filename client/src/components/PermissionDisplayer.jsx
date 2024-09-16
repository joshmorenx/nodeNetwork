import PropTypes from 'prop-types';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import usePermissions from '../hooks/usePermissions';
import useUpdatePermissions from '../hooks/useUpdatePermissions';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

export default function PermissionDisplayer({ token, UserUnassignedPermissions, UserAssignedPermissions, selectedUser }) {
  const { user } = useGetCurrentUser({ token });
  let { cadena, allAccess } = usePermissions(user);
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  const [disabledAddPermission, setDisabledAddPermission] = useState(true);
  const [disabledRemovePermission, setDisabledRemovePermission] = useState(true);
  const [message, setMessage] = useState('');
  const [permissionAmount, setPermissionAmount] = useState(0);
  const { sendRequest, msg, error, succes, setMsg } = useUpdatePermissions(UserAssignedPermissions, selectedUser);
  const className = useSelector((state) => state.className);
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
  const isMobile = useMediaQuery('(max-width: 425px)');

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
      <Box className={`permissions cursor-pointer m-1 border border-black ${selectedPermissionId === permission.permissionId ? 'bg-orange-500 text-white' : ''}`} key={permission.permissionId} onClick={() => {
        selectPermission(permission.permissionId);
        assignationChoosen == 1 ? setDisabledAddPermission(false) : setDisabledAddPermission(true);
        assignationChoosen == 2 ? setDisabledRemovePermission(false) : setDisabledRemovePermission(true)
      }}>
        {permission.permissionId} : {'<'}{permission.permissionName}{'>'}
      </Box>
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
      setMsg('');
    }, 3000);

  }, [msg])

  useEffect(() => {
    if (UserAssignedPermissions.length !== undefined && UserUnassignedPermissions.length !== undefined) {
      setPermissionAmount(UserAssignedPermissions.length + UserUnassignedPermissions.length);
    }
  }, [UserAssignedPermissions, UserUnassignedPermissions])

  try {
    if (allAccess || user.userId === 1) {
      return (
        <>
          <Box className={isDesktop ? "available-permissions" : "available-permissions-mobile"}>

            <Box className="bgx-white" style={{ width: '100%', height: isDesktop ? '' : 'auto' }}>
              <Typography>Permisos Disponibles</Typography>
              <Box className="rounded-lg unassigned-permissions border border-black bg-white" style={{ width: '100%', height: isDesktop ? '' : '20vh' }} id="unassigned">
                {/* { bArray.map( (item, index) => <Box className='m-1 border border-black' key={index} onClick={}>{item}</Box> ) } */}
                {selectedUser && getAllPermissions(UserUnassignedPermissions, 1)}
              </Box>
            </Box>

            <Box className={(isDesktop ? "btnContainer" : "btnContainerMobile") + " " + className}>
              <Box>
                <button onClick={moveFromUnassignedToAssigned} className='disabled:rounded-sm disabled:bg-gray-300 disabled:text-white rounded-sm bg-blue-500 mb-1 text-white font-bold' id={isDesktop ? "btnAdd" : "btnAddMobile"} disabled={disabledAddPermission}> + </button>
              </Box>

              <Box>
                <button onClick={moveFromAssignedToUnassigned} className='disabled:rounded-sm disabled:bg-gray-300 disabled:text-white rounded-sm bg-blue-500 mb-1 text-white font-bold' id={isDesktop ? "btnRemove" : "btnRemoveMobile"} disabled={disabledRemovePermission}> - </button>
              </Box>
            </Box>

            <Box className="bgx-white" style={{ width: '100%', height: isDesktop ? '' : 'auto' }}>
              <Typography>Permisos Asignados</Typography>
              <Box className="rounded-lg assigned-permissions border border-black bg-white" style={{ width: '100%', height: isDesktop ? '' : '20vh' }} id="assigned">
                {/* { cArray.map( (item, index) => <Box className='m-1 border border-black' key={index}>{item}</Box> ) } */}
                {selectedUser && getAllPermissions(UserAssignedPermissions, 2)}
              </Box>
            </Box>

          </Box>

          {/* <button onClick={updatePermissions} className='p-2 rounded-sm bg-blue-500 font-bold disabled:p-2 disabled:rounded-sm disabled:bg-slate-500 text-white mt-10' id="btnSave" >Guardar Cambios</button> */}

          <Button disabled={!selectedUser} onClick={updatePermissions} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar Cambios
          </Button>

          <Typography className='bg-black text-white'> {message} </Typography>

        </>
      );
    } else {
      return (
        <>{cadena}</>
      )
    }
  } catch (error) {
    //console.error(error);
  }
}

PermissionDisplayer.propTypes = {
  token: PropTypes.string.isRequired,
}