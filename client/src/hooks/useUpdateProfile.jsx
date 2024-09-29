import axios from 'axios';
import { useState } from 'react';

export default function useUpdateProfile({ token, initialForm = {}}) {
    const allowedNameCharacters = /^[a-zA-Z\s]*$/;
    const allowedEmailCharacters = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
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

        if (!allowedNameCharacters.test(formUserData.firstName) || !allowedNameCharacters.test(formUserData.lastName)) {
            alert('Nombres y apellidos deben contener solo letras.');
            return;
        }

        if(formUserData.email !== '' && !allowedEmailCharacters.test(formUserData.email)){
            alert('Correo electrónico inválido.');
            return;
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
            setMsg(error.response.data.message);
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