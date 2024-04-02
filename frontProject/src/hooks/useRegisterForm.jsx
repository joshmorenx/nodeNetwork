import { useState } from "react";
import axios from "axios";

const useRegisterForm = (initialForm = {}) => {
    const [formData, setFormData] = useState(initialForm);
    const [state, setState] = useState('')
    const [registryCompletion, setRegistryCompletion] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendForm = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:3000/register`,
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.username,
                password: formData.password,
                pwdConfirmation: formData.pwdConfirmation,
            }).then((response) => {
                console.log(response.data.msg);
                console.log(response.data.regState);
                setState(response.data.msg);
                setRegistryCompletion(response.data.regState)
            }).catch(error => {
                console.log(error.response.data.error);
                setState(error.response.data.error);
            });
    };
    return {
        handleInputChange,
        sendForm,
        state,
        registryCompletion,
        ...formData,
        formData
    }
}

export default useRegisterForm