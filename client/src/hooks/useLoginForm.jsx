import { useState } from "react";
import axios from "axios";

const useLoginForm = (initialForm = {}) => {
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
        await axios.post(`http://localhost:3000/`,
            {
                username: formData.username,
                password: formData.password,
                isLogged: true
            }).then((response) => {
                setLoginData(response.data.msg)
                setToken(response.data.token)
                setUserInfo(response.data.user)
            }).catch(error => {
                // console.log(error.response.data.error);
                setLoginData(error.response.data.error);
            });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    // const getToken = async (token) => {
    //     await axios.get(`http://localhost:3000/`,
    //     {

    //     })
    // }

    return {
        handleInputChange,
        sendForm,
        handleClose,
        loginData,
        ...formData,
        formData,
        tokenState,
        userInfo,
        open
    }
}

export default useLoginForm