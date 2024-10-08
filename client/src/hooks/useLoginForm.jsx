import { useState } from "react";
import axios from "axios";

const useLoginForm = (initialForm = {}) => {
    const backendUrl = import.meta.env.VITE_BACKEND
    const [formData, setFormData] = useState(initialForm);
    const [loginData, setLoginData] = useState('')
    const [tokenState, setToken] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [open, setOpen] = useState(false);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendForm = async (event) => {
        event.preventDefault();
        setOpen(true)
        await axios.post(`${backendUrl}/api/login/`,
            {
                username: formData.username,
                password: formData.password,
                isLogged: true
            }).then((response) => {
                setLoginData(response.data.msg)
                setToken(response.data.token)
                setUserInfo(response.data.user)
            }).catch(error => {
                setLoginData(error.response.data.error);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return {
        handleInputChange,
        sendForm,
        handleClose,
        loginData,
        formData,
        tokenState,
        userInfo,
        open
    }
}

export default useLoginForm