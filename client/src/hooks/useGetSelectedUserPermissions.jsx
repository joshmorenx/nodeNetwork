import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useGetSelectedUserPermissions (selectedUserName){
    const [UserAssignedPermissions, setUserAssignedPermissions] = useState({});
    const [UserUnasignedPermissions, setUserUnasignedPermissions] = useState({});

    const enviarSolicitud = async (typeQuery) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/permissions/`,{
                headers: {
                    username: selectedUserName
                }
            });
            if(response){
                setUserAssignedPermissions(response.data.assignedPermissions);
                setUserUnasignedPermissions(response.data.unassignedPermissions);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
    return { UserAssignedPermissions, UserUnasignedPermissions, enviarSolicitud };
}