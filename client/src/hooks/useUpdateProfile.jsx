import axios from 'axios';
import { useState } from 'react';

export default function useUpdateProfile({ token, initialForm = {}}) {
    const [formUserData, setFormUserData] = useState(initialForm);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [newToken, setNewToken] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormUserData({ ...formUserData, [name]: value });
    }

    const sendRequest = async (opt, image) => {
        const formData = new FormData();
        formData.append('option', opt);
        formData.append('firstName', formUserData.firstName);
        formData.append('lastName', formUserData.lastName);
        formData.append('email', formUserData.email);

        if (image) {
            formData.append('image', image);
        }
        
        await axios.post('https://nodenetwork-backend.onrender.com/api/updateProfile/', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
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
        formUserData,
        error,
        success,
        msg,
        handleInputChange,
        sendRequest,
        newToken
    }
}