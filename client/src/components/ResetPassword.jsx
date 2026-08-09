import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from 'react'
import { useSetNewPassword } from '../hooks/useSetNewPassword.jsx'
import { useNavigate } from "react-router";
import { authFieldSx, authPrimaryButtonSx } from './authSx';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AuthSnackbar from './AuthSnackbar';

export default function ResetPassword({ token, decodedToken, isDesktop, isTablet }) {
    const navigate = useNavigate()
    const [oddPasswords, setOddPasswords] = useState(true)
    const [idleState, setIdleState] = useState(true)
    const { setNewPassword, formData, handleInputChange, success, state, open, handleClose, alertSeverity } = useSetNewPassword({ resetForm: { password: '', passwordConfirmation: '' } })

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
            {idleState ? <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
                <Typography sx={{ fontSize: isDesktop ? 16 : (isTablet ? 15 : 14), color: '#475569', lineHeight: 1.7 }}>
                    Hola <strong style={{ color: '#7c3aed' }}>{decodedToken.username}</strong>, por favor ingresa tu nueva contraseña.
                </Typography>

                <TextField
                    label="Contraseña"
                    sx={{ ...authFieldSx, mt: '22px' }}
                    fullWidth
                    size='medium'
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <TextField
                    label="Confirmar contraseña"
                    sx={{ ...authFieldSx, mt: '18px' }}
                    fullWidth
                    size='medium'
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleInputChange}
                />

                <Button
                    sx={{ ...authPrimaryButtonSx, mt: '26px' }}
                    variant="contained"
                    disabled={oddPasswords}
                    onClick={(event) => { setNewPassword(event, token, decodedToken.username, formData.password, formData.passwordConfirmation) }}
                >
                    Cambiar contraseña
                </Button>
            </Box> :
                <Box className="auth-message">
                    <Box className="auth-message-icon ok">
                        <CheckCircleOutlinedIcon sx={{ fontSize: 30 }} />
                    </Box>
                    <p className="auth-message-text">
                        Tu contraseña fue actualizada con exito, ahora puedes iniciar sesion.
                    </p>
                    <Button sx={{ ...authPrimaryButtonSx, mt: '10px', maxWidth: 260 }} variant="contained" onClick={() => { navigate('/') }}>
                        Iniciar sesion
                    </Button>
                </Box>
            }

            <AuthSnackbar open={open} message={state || 'Por favor, Espere...'} severity={alertSeverity} onClose={preHandleClose} />
        </>
    )
}

ResetPassword.propTypes = {
    token: PropTypes.string.isRequired,
    decodedToken: PropTypes.object.isRequired,
    isDesktop: PropTypes.bool.isRequired,
    isTablet: PropTypes.bool.isRequired,
};
