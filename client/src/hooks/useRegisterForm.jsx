import { useState } from "react";
import axios from "axios";

const useRegisterForm = (initialForm = {}) => {
    const [formData, setFormData] = useState(initialForm);
    const [state, setState] = useState('')
    const [registryCompletion, setRegistryCompletion] = useState(false)
    const [open, setOpen] = useState(false);

    const allowedNameCharacters = /^[a-zA-Z\s]*$/;
    const allowedUserCharacters = /^[a-zA-Z0-9]*$/;
    const allowedEmailCharacters = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const allowedPasswordCharacters = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendForm = async (event) => {
        event.preventDefault();

        // Validaciones

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.pwdConfirmation) {
            setState('Rellene todos los campos.');
            setOpen(true);
            return;
        }

        if (!allowedNameCharacters.test(formData.firstName) || !allowedNameCharacters.test(formData.lastName)) {
            setState('Nombres y apellidos deben contener solo letras.');
            setOpen(true);
            return;
        }

        if (!allowedUserCharacters.test(formData.username)) {
            setState('Nombre de usuario contiene caracteres no permitidos.');
            setOpen(true);
            return;
        }

        if (!allowedEmailCharacters.test(formData.email)) {
            setState('Correo electrónico inválido.');
            setOpen(true);
            return;
        }

        if (!allowedPasswordCharacters.test(formData.password)) {
            setState('Contraseña debe contener al menos 8 caracteres, incluyendo al menos un número, una letra mayúscula y una letra minúscula.');
            setOpen(true);
            return;
        }

        if (formData.password !== formData.pwdConfirmation) {
            setState('Las contraseñas no coinciden.');
            setOpen(true);
            return;
        }

        setOpen(true)
        await axios.post('https://nodenetwork-backend.onrender.com/api/register/',
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.username,
                password: formData.password,
                pwdConfirmation: formData.pwdConfirmation,
                option: 'register'
            }).then((response) => {
                // console.log(response.data.msg);
                // console.log(response.data.regState);
                setState(response.data.msg);
                setRegistryCompletion(response.data.regState)
            }).catch(error => {
                // console.log(error.response.data.error);
                setState(error.response.data.error);
                setState(error.response.data.msg);
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
        state,
        registryCompletion,
        formData,
        open
    }
}

export default useRegisterForm