import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, TextField, Box, IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HubIcon from '@mui/icons-material/Hub';
import { authFieldSx, authPrimaryButtonSx } from './authSx';
import AuthSnackbar from './AuthSnackbar';

export default function LoginDisplayer({ handleInputChange, formData, sendForm, userInfo, open, preHandleClose, loginData, alertSeverity }) {
    const [showPassword, setShowPassword] = useState(false);
    const [gatheredLoginData, setGatheredLoginData] = useState('');
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');

    useEffect(() => {
        loginData ? setGatheredLoginData(loginData) : setGatheredLoginData('Por favor, Espere...');
    }, [loginData])

    const cardClass = isDesktop ? 'auth-card auth-card-desktop' : isTablet ? 'auth-card auth-card-tablet' : 'auth-card auth-card-mobile';

    return (
        <Box className='login-background'>
            <Box className={cardClass}>
                {isDesktop && (
                    <Box className='auth-brand'>
                        <Box className='auth-brand-header'>
                            <Box className='auth-brand-badge'>
                                <HubIcon sx={{ fontSize: 34 }} />
                            </Box>
                            <Box className='auth-brand-name'>Node Network</Box>
                        </Box>
                        <p className='auth-brand-sub'>
                            Tu espacio para conectarte con la comunidad: comparte publicaciones, sigue a tus amigos y descubre nuevo contenido.
                        </p>
                        <ul className='auth-brand-features'>
                            <li className='auth-brand-feature'>Crea y comparte publicaciones</li>
                            <li className='auth-brand-feature'>Sigue a otros usuarios</li>
                            <li className='auth-brand-feature'>Explora el contenido de tu red</li>
                        </ul>
                    </Box>
                )}

                <Box className='auth-panel'>
                    <Box className='auth-panel-inner'>
                        <h1 className='login-title'>Iniciar sesión</h1>
                        <p className='auth-subtitle'>Accede a tu cuenta para continuar</p>

                        <form className='login-form' method='post' action='/'>
                            <TextField
                                autoFocus={true}
                                sx={authFieldSx}
                                fullWidth
                                size='medium'
                                type='text'
                                id='username'
                                name='username'
                                required
                                label='Nombre de usuario'
                                value={formData.username}
                                onChange={handleInputChange}
                            />

                            <TextField
                                sx={authFieldSx}
                                fullWidth
                                size='medium'
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                label='Contraseña'
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge='end'
                                            sx={{ color: '#7c3aed' }}
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    )
                                }}
                            />

                            <Button
                                sx={{ ...authPrimaryButtonSx, mt: '6px' }}
                                size='large'
                                variant='contained'
                                color='primary'
                                type='submit'
                                onClick={sendForm}
                                disabled={!formData.password || !formData.username}
                            >
                                Iniciar sesión
                            </Button>
                        </form>

                        <Box className='user-info'>{userInfo.user}</Box>

                        <Box className='register-link'>
                            <p><span className='muted'>¿Aún no tienes una cuenta?</span> <Link to='/register'>Regístrate</Link></p>
                            <p><Link to='/forgot'>¿Olvidaste tu contraseña?</Link></p>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <AuthSnackbar open={open} message={gatheredLoginData} severity={alertSeverity} pending={!loginData} onClose={preHandleClose} />
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
