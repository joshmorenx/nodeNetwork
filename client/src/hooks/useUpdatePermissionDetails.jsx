import { useState } from "react";
import axios from "axios";

export default function useUpdatePermissionDetails({ token, id, newDescription }) {
    const backendUrl = import.meta.env.VITE_BACKEND
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const sendRequest = async () => {
        await axios.post(`${backendUrl}/api/modifyPermissions/`, {
            id: id,
            newDescription: newDescription
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setMsg(response.data.message);
            setSuccess(response.data.success);
        }).catch((error) => {
            setError(error);
        })
    }
    return { sendRequest, msg, error, success }
}