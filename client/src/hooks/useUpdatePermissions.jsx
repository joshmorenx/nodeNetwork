import { useState } from "react";
import axios from 'axios';


export default function useUpdatePermissions({ token, UserAssignedPermissions, selectedUser }) {
    const backendUrl = import.meta.env.VITE_BACKEND
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const sendRequest = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/updatePermissions/`, {
                newPermissions: UserAssignedPermissions,
                username: selectedUser,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                setMsg(response.data.message)
                setSuccess(response.data.success)
            } else {
                setError(response.data.error)
            }
        } catch (error) {
            // setError(error)
        }
    }

    return { sendRequest, msg, error, success, setMsg }
}