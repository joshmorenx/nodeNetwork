import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetAllPermissions() {
    const [permissionDetails, setPermissionDetails] = useState([]);
    const [errorDetails, setErrorDetails] = useState('');

    // useEffect(() => {
        const sendRequestedPermissions = async () => {
            await axios.get('https://nodenetwork-backend.onrender.com/api/getAllPermissions/')
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
        // setInterval(() => {
            // sendRequestedPermissions();
        // }, 1000);
    // }, [])
    return { permissionDetails, errorDetails, sendRequestedPermissions }
}