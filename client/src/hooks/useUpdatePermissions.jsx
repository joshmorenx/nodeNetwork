import { useState } from "react";
import axios from 'axios';


export default function useUpdatePermissions(UserAssignedPermissions, selectedUser) {
    const [msg , setMsg] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState(false)

    const sendRequest = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/update_permissions/', {
                newPermissions : UserAssignedPermissions,
                username : selectedUser,
            })
            if(response){
                setMsg(response.data.message)
                setSuccess(response.data.success)
            }
        } catch (error) {
            setError(response.data.error)
        }
    }

    return {sendRequest, msg, error, success}
}