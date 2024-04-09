import axios from 'axios';
import { useState } from 'react';

export default function useGetSelectedUserPermissions (selectedUserName){
    const [userdata, setUserdata] = useState({});
    const enviarSolicitud = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/permissions/`,{
                params: {
                    username: selectedUserName
                }
            });
            if(response.data){
                setUserdata(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }
    return { userdata, enviarSolicitud };
}