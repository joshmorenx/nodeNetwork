import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetPermissionDescription(id) {
    const [permissionDescription, setPermissionDescription] = useState('');

    useEffect(() => {
        const sendRequest = async () => {
            await axios.get('https://nodenetwork-backend.onrender.com/api/getPermissionDescription/', { 
                headers: {
                    id: id,
                },
            })
            .then((response) => {
                setPermissionDescription(response.data.description);
            })
            .catch((error) => {
                console.log('error: ', error);
            })
        }
        sendRequest();
    }, [ id ]);
    return { permissionDescription }
}