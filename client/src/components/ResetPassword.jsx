import { Box, TextField, Button, Alert, Snackbar } from "@mui/material";
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSetNewPassword } from '../hooks/useSetNewPassword.jsx'
import { useNavigate } from "react-router";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ResetPassword({ token, decodedToken }) {
    const navigate = useNavigate()
    const [oddPasswords, setOddPasswords] = useState(true)
    const [idleState, setIdleState] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const { setNewPassword, formData, handleInputChange, success, state, open, handleClose } = useSetNewPassword({ resetForm: { password: '', passwordConfirmation: '' } })

    const preHandleClose = (event, reason) => {
        handleClose(event, reason);
    }

    useEffect(() => {
        if (formData.password.length > 0 && formData.passwordConfirmation.length > 0 && formData.password === formData.passwordConfirmation) {
            setOddPasswords(false)
        } else {
            setOddPasswords(true)
        }
    }, [formData.password, formData.passwordConfirmation])

    useEffect(() => {
        if (success) {
            setIdleState(false)
        }
    }, [success])


    return (
        <>
            {idleState ? <Box>
                <h1 className="login-title">Nueva contraseña</h1>
                <p className="login-subtitle">hola {decodedToken.username}! por favor, ingresa tu nueva contraseña.</p>
                <TextField
                    label="Contraseña"
                    sx={{ mb: 2 }}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (<LockOutlinedIcon className="login-field-icon" />),
                        endAdornment: (
                            <Button
                                className="login-toggle-button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </Button>
                        )
                    }}
                />

                <TextField
                    label="Confirmar contraseña"
                    sx={{ mb: 1 }}
                    fullWidth
                    type={showConfirmation ? "text" : "password"}
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (<LockOutlinedIcon className="login-field-icon" />),
                        endAdornment: (
                            <Button
                                className="login-toggle-button"
                                onClick={() => setShowConfirmation(!showConfirmation)}
                                aria-label={showConfirmation ? "Ocultar confirmación" : "Mostrar confirmación"}
                            >
                                {showConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </Button>
                        )
                    }}
                />

                <Button
                    className="login-submit-button"
                    sx={{ mt: 2.5, mb: 0.5 }}
                    fullWidth
                    variant="contained"
                    disabled={oddPasswords}
                    onClick={(event) => { setNewPassword(event, token, decodedToken.username, formData.password, formData.passwordConfirmation) }}
                >
                    Cambiar contraseña
                </Button>
                <Snackbar sx={{ width: '100%', ml: 'auto', mr: 'auto', mt: '-13vh' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={5000} onClose={preHandleClose}>
                    <Alert onClose={preHandleClose} severity="info" sx={{ width: '100%' }}>
                        {state}
                    </Alert>
                </Snackbar>
            </Box> :
                <Box>
                    <h1 className="login-title">¡Contraseña actualizada!</h1>
                    <p className="login-subtitle">Tu contraseña fue actualizada con exito, ahora puedes iniciar sesion.</p>
                    <Button className="login-submit-button" fullWidth variant="contained" color="primary" onClick={() => { navigate('/') }}>
                        Iniciar sesion
                    </Button>
                </Box>
            }
        </>
    )
}

ResetPassword.propTypes = {
    token: PropTypes.string.isRequired,
    decodedToken: PropTypes.shape({
        username: PropTypes.string
    }).isRequired
}
