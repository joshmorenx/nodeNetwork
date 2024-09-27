import axios from 'axios'
import { useState } from 'react'

export function useSetNewPassword({ resetForm = {} }) {
    const [formData, setFormData] = useState(resetForm)
    const [loading, setLoading] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const [state, setState] = useState('')
    const [open, setOpen] = useState(false);

    const allowedNameCharacters = /^[a-zA-Z\s]*$/;
    const allowedUserCharacters = /^[a-zA-Z0-9]*$/;
    const allowedEmailCharacters = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const allowedPasswordCharacters = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const setNewPassword = async (event, token, username, password, passwordConfirmation) => {
        event.preventDefault()


        if (!allowedPasswordCharacters.test(formData.password)) {
            setState('Contraseña debe contener al menos 8 caracteres, incluyendo al menos un número, una letra mayúscula y una letra minúscula.');
            setOpen(true);
            return;
        }

        else if (formData.password !== formData.passwordConfirmation) {
            setState('Las contraseñas no coinciden.');
            setOpen(true);
            return;
        } else {
            setState('');
            setOpen(false);
        }

        setOpen(true)
        setLoading(true)
        await axios.post('https://nodenetwork-backend.onrender.com/api/resetPassword/', {
            token: token,
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }).then((response) => {
            setSuccess(response.data.success)
            setMsg(response.data.msg)
            setState(msg)
            setLoading(false)
        }).catch((error) => {
            setError(error.response.data.error)
            setLoading(false)
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }


    return { setNewPassword, formData, handleInputChange, loading, success, error, msg, state, open, handleClose }
}