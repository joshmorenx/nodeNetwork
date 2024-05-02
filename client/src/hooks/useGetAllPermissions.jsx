import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetAllPermissions() {
    const [permissionDetails, setPermissionDetails] = useState([]);
    const [errorDetails, setErrorDetails] = useState('');

    useEffect(() => {
        const sendRequest = async () => {
            await axios.get('http://localhost:3000/api/getAllPermissions/')
            .then((response) => {
                setPermissionDetails(response.data.allPermissionDetails);
                // console.log(permissionDetails);
            })
            .catch((error) => {
                setErrorDetails(error);
                // console.log(errorDetails);
            })
        }
        //keep alive conection to permissions
        setInterval(() => {
            sendRequest();
        }, 1000);
    }, [])
    return { permissionDetails, errorDetails }
}