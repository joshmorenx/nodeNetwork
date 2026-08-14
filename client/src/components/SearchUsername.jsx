import { useEffect } from 'react'
import { Button, TextField, Box, Typography } from '@mui/material/';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import useGenerateRecoveryLink from '../hooks/useGenerateRecoveryLink.jsx'

export default function SearchUsername({ isDesktop, isTablet, handleFoundUser }) {
    const { data, userStatus, handleInputChange, sendRequest } = useGenerateRecoveryLink({
        inputData: {
            username: ''
        }
    })

    useEffect(() => {
        (userStatus) && handleFoundUser(userStatus)
    }, [userStatus])

    return (
        <Box className={`login-card ${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
            <h1 className="login-title">Recupera tu cuenta</h1>
            <p className="login-subtitle">Ingresa tu nombre de usuario y te enviaremos un correo para restablecer tu contraseña.</p>

            <Box className="login-info-box">
                <Typography>Ingresa tu nombre de usuario y despues haz click en recuperar</Typography>
            </Box>

            <Box className={isDesktop ? 'login-form' : (isTablet ? 'login-form-tablet' : 'login-form-mobile')}>

                <TextField
                    autoFocus={true}
                    sx={{ mb: 2 }}
                    fullWidth
                    type="text"
                    id="username"
                    name="username"
                    required
                    autoComplete="username"
                    label="Nombre de usuario"
                    value={data.username}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (<PersonOutlineIcon className="login-field-icon" />)
                    }}
                />

                <Button
                    className="login-submit-button"
                    sx={{ mt: 1, mb: 0.5 }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={sendRequest}
                    disabled={!data.username}
                >
                    Recuperar
                </Button>

            </Box>

            <Box className="register-link">
                <p id="register"><Link to='/'>Volver</Link></p>
            </Box>
        </Box>
    )
}

SearchUsername.propTypes = {
    isDesktop: PropTypes.bool.isRequired,
    isTablet: PropTypes.bool.isRequired,
    handleFoundUser: PropTypes.func.isRequired
}