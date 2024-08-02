import axios from 'axios';
import { useState } from 'react';

export default function useGetSelectedUserPermissions (selectedUserName){
    const [UserUnassignedPermissions, setUserUnasignedPermissions] = useState({});
    const [UserAssignedPermissions, setUserAssignedPermissions] = useState({});

    const enviarSolicitud = async () => {
        try {
            const response = await axios.get(`https://nodenetwork-backend.onrender.com/api/permissions/`,{
                headers: {
                    username: selectedUserName
                }
            });
            if(response){
                setUserUnasignedPermissions(response.data.unassignedPermissions);
                setUserAssignedPermissions(response.data.assignedPermissions);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
    return { UserUnassignedPermissions, UserAssignedPermissions, enviarSolicitud };
}