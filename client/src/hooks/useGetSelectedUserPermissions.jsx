import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useGetSelectedUserPermissions (selectedUserName){
    const [userData, setUserData] = useState({});

    const enviarSolicitud = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/permissions/`,{
                headers: {
                    username: selectedUserName
                }
            });
            if(response){
                setUserData(response.data);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
    return { userData, enviarSolicitud };
}