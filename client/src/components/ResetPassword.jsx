import { Box, Typography, useMediaQuery, TextField, Button, Alert, Snackbar } from "@mui/material";
import { useState, useEffect } from 'react'
import { useSetNewPassword } from '../hooks/useSetNewPassword.jsx'
import { useNavigate } from "react-router";

export default function ResetPassword({ token, decodedToken, isDesktop, isTablet, isMobile }) {
    const navigate = useNavigate()
    const [oddPasswords, setOddPasswords] = useState(true)
    const [idleState, setIdleState] = useState(true)
    const { setNewPassword, formData, handleInputChange, loading, success, error, msg, state, open, handleClose } = useSetNewPassword({ resetForm: { password: '', passwordConfirmation: '' } })

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
                <Typography sx={{ mt: 3, fontSize: isDesktop ? 20 : (isTablet ? 15 : 10) }}>
                    hola {decodedToken.username}! por favor, ingresa tu nueva contraseña.
                </Typography>
                <TextField
                    label="Contraseña"
                    sx={{ mt: 3, mb: 1, width: '100%', ml: 'auto', mr: 'auto' }}
                    size='small'
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Confirmar contraseña"
                    sx={{ mt: 3, mb: 1, width: '100%', ml: 'auto', mr: 'auto' }}
                    size='small'
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleInputChange}
                />

                <Button
                    sx={{ mt: 3, mb: 3, width: '100%', ml: 'auto', mr: 'auto' }}
                    variant="contained"
                    disabled={oddPasswords}
                    onClick={(event) => { setNewPassword(event, token, decodedToken.username, formData.password, formData.passwordConfirmation) }}
                >
                    Cambiar contraseña
                </Button>
                <Snackbar sx={{ width: '100%', ml: 'auto', mr: 'auto', mt: '-13vh' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={5000} onClose={preHandleClose}>
                    <Alert onClose={preHandleClose} severity="info" sx={{ width: '100%' }}>
                        {state}
                    </Alert>
                </Snackbar>
            </Box> :
                <Box>
                    <Typography sx={{ mt: 3, fontSize: isDesktop ? 20 : (isTablet ? 15 : 10) }}>
                        Tu contraseña fue actualizada con exito, ahora puedes iniciar sesion.
                    </Typography>
                    <Button onClick={()=>{navigate('/')}}>
                        Iniciar sesion
                    </Button>
                </Box>
            }
        </>
    )
}
