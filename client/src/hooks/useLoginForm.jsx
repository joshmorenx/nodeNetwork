import { useState } from "react";
import axios from "axios";

const useForm = (initialForm = {}) => {
    const [formData, setFormData] = useState(initialForm);

    const [state, setState] = useState('')
    const [tokenState, setToken] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendForm = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:3000/`,
            {
                username: formData.username,
                password: formData.password,
                isLogged: true
            }).then((response) => {
                setState(response.data.msg)
                setToken(response.data.token)
                setUserInfo(response.data.user)
            }).catch(error => {
                console.log(error.response.data.error);
                setState(error.response.data.error);
            });
    };

    // const getToken = async (token) => {
    //     await axios.get(`http://localhost:3000/`,
    //     {

    //     })
    // }

    return {
        handleInputChange,
        sendForm,
        state,
        ...formData,
        formData,
        tokenState,
        userInfo
    }
}

export default useForm