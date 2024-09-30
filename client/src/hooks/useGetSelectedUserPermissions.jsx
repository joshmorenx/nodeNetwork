import axios from 'axios';
import { useState } from 'react';

export default function useGetSelectedUserPermissions({ token, selectedUserName }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [UserUnassignedPermissions, setUserUnasignedPermissions] = useState({});
    const [UserAssignedPermissions, setUserAssignedPermissions] = useState({});

    const enviarSolicitud = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/permissions/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: selectedUserName
                }
            });
            if (response) {
                setUserUnasignedPermissions(response.data.unassignedPermissions);
                setUserAssignedPermissions(response.data.assignedPermissions);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
    return { UserUnassignedPermissions, UserAssignedPermissions, enviarSolicitud };
}