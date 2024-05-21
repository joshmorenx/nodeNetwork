import axios from 'axios';
import { useState } from 'react';

export default function useUpdateProfile({ token, initialForm = {}}) {
    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [newToken, setNewToken] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const sendRequest = async (opt) => {
        await axios.post('http://localhost:3000/api/updateProfile/',{
            headers: {
                Authorization: `Bearer ${token}`,
            },
            option: opt,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            // picture: formData.picture
        }).then((response) => {
            setMsg(response.data.message);
            setSuccess(response.data.success);
            setNewToken(response.data.token);
        }).catch((error) => {
            setError(error);
            console.log(error);
        })
    }
    
    return{
        formData,
        error,
        success,
        msg,
        handleInputChange,
        sendRequest,
        newToken
    }
}