import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetPermissionDescription({ token, id }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [permissionDescription, setPermissionDescription] = useState('');

    useEffect(() => {
        const sendRequest = async () => {
            await axios.get(`${backendUrl}/api/getPermissionDescription/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    id: id,
                },
            }).then((response) => {
                setPermissionDescription(response.data.description);
            }).catch((error) => {
                console.log('error: ', error);
            })
        }
        sendRequest();
    }, [id]);
    return { permissionDescription }
}