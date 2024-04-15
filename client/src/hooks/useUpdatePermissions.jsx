import { useState } from "react";
import axios from 'axios';


export default function useUpdatePermissions(UserAssignedPermissions, selectedUser) {
    const [msg , setMsg] = useState('')
    const [error , setError] = useState('')
    const [success , setSuccess] = useState(false)

    const sendRequest = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/permissions', {
                params : {
                    username : selectedUser,
                    newPermissions : UserAssignedPermissions
                }
            })
            if(response){
                setMsg(response.data.msg)
                setError(response.data.error)
                setSuccess(response.data.success)
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    return {sendRequest, msg, error, success}
}