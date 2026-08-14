import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, TextField, Alert, Snackbar, Box } from '@mui/material/';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthBrand from './AuthBrand';

export default function LoginDisplayer({ handleInputChange, formData, sendForm, userInfo, open, preHandleClose, loginData, isError }) {
    const [showPassword, setShowPassword] = useState(false);
    const [gatheredLoginData, setGatheredLoginData] = useState('');
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');

    useEffect(() => {
        loginData ? setGatheredLoginData(loginData) : setGatheredLoginData('Por favor, Espere...');
    }, [loginData])

    // Distinguish error / success / pending feedback without touching the messages produced by the server validations
    const alertSeverity = isError ? 'error' : (loginData ? 'success' : 'info');

    return (
        <Box className='login-background'>
            <Box className="login-page">
                {isDesktop && <AuthBrand />}
                <Box className="login-card-wrap">
                    <Box className={`login-card ${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
                        <h1 className="login-title">Iniciar sesión</h1>
                        <p className="login-subtitle">Bienvenido de nuevo, ingresa tus credenciales</p>
                        <form className={isDesktop ? 'login-form' : (isTablet ? 'login-form-tablet' : 'login-form-mobile')} method="post" action="/">

                            <TextField
                                autoFocus={true}
                                sx={{ mb: 2.5 }}
                                fullWidth
                                type="text"
                                id="username"
                                name="username"
                                required
                                autoComplete="username"
                                label="Nombre de usuario"
                                value={formData.username}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (<PersonOutlineIcon className="login-field-icon" />)
                                }}
                            />

                            <TextField
                                sx={{ mb: 1 }}
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                label="Contraseña"
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

                            <Button
                                className="login-submit-button"
                                sx={{ mt: 2.5, mb: 0.5 }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={sendForm}
                                disabled={!formData.password || !formData.username}
                            >
                                Iniciar sesión
                            </Button>

                        </form>
                        <Box className="user-info">{userInfo.user}</Box>
                        <Box className="login-separator"><span>¿Nuevo en Node Network?</span></Box>
                        <Box className="register-link">
                            <p id="register"><Link to='/register'>Regístrate</Link></p>
                            <p id="recover"><Link to='/forgot'>Recuperar contraseña</Link></p>
                        </Box>

                    </Box>
                </Box>
            </Box>
            {/* <Box className="login-message">{loginData}</Box> */}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={!loginData ? 999999 : 5000} onClose={preHandleClose}>
                <Alert onClose={preHandleClose} severity={alertSeverity} variant="filled" sx={{ width: '100%', borderRadius: '12px', fontWeight: 500 }}>
                    {gatheredLoginData}
                </Alert>
            </Snackbar>
        </Box>
    )
}

LoginDisplayer.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    sendForm: PropTypes.func.isRequired,
    userInfo: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    preHandleClose: PropTypes.func.isRequired,
    loginData: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
}