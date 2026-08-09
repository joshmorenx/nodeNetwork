import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, TextField, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AuthSnackbar from './AuthSnackbar';

export default function LoginDisplayer({ handleInputChange, formData, sendForm, userInfo, open, preHandleClose, loginData, alertSeverity }) {
    const [showPassword, setShowPassword] = useState(false);
    const [gatheredLoginData, setGatheredLoginData] = useState('');
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');

    useEffect(() => {
        loginData ? setGatheredLoginData(loginData) : setGatheredLoginData('Por favor, Espere...');
    }, [loginData])

    return (
        <Box className='login-background'>
            <Box className={`${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
                <h1 className="login-title">Iniciar sesión</h1>
                <form className={isDesktop ? 'login-form' : (isTablet ? 'login-form-tablet' : 'login-form-mobile')} method="post" action="/">

                    <TextField
                        autoFocus={true}
                        sx={{ mt: 4, mb: 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='large'
                        type="text"
                        id="username"
                        name="username"
                        required
                        label="Nombre de usuario"
                        value={formData.username}
                        onChange={handleInputChange}
                    />

                    <TextField
                        sx={{ mt: 2, mb: 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='large'
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        label="Contraseña"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon variant="outlined" /> : <VisibilityIcon variant="filled" />}
                                </Button>
                            )
                        }}
                    />

                    <Button
                        sx={{ mt: 4, mb: 1, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='small'
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
                <Box className="register-link">
                    <p id="register"><Link to='/register'>Regístrate</Link></p>
                    <p id="recover"><Link to='/forgot'>Recuperar contraseña</Link></p>
                </Box>

            </Box>
            <AuthSnackbar
                open={open}
                message={gatheredLoginData}
                severity={alertSeverity}
                pending={!loginData}
                onClose={preHandleClose}
            />
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
    alertSeverity: PropTypes.string.isRequired
}
