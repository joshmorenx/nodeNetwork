import useRegisterForm from '../hooks/useRegisterForm';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import '../assets/styles.css';
import '../assets/index.css';
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import HubIcon from '@mui/icons-material/Hub';
import { authFieldSx, authPrimaryButtonSx } from '../components/authSx';
import AuthSnackbar from '../components/AuthSnackbar';

const Register = () => {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');
    const navigate = useNavigate();
    const { handleInputChange, sendForm, handleClose, registryCompletion, state, open, formData, alertSeverity } = useRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        pwdConfirmation: '',
    })
    const [gatheredState, setGatheredState] = useState('');

    const preHandleClose = (event, reason) => {
        handleClose(event, reason);
    }

    useEffect(() => {
        state ? setGatheredState(state) : setGatheredState('Por favor, Espere...');
    }, [state])

    useEffect(() => {
        if (!registryCompletion) return;
        const redirectTimer = setTimeout(() => {
            navigate('/', { state: { msg: 'Registro exitoso, ahora puedes iniciar sesión.' } });
        }, 4000);
        return () => clearTimeout(redirectTimer);
    }, [registryCompletion, navigate])

    const cardClass = isMobile
        ? 'auth-card auth-card-mobile'
        : isTablet
            ? 'auth-card auth-card-tablet'
            : 'auth-card auth-card-desktop';

    return (
        <>
            <Helmet>
                <title>Register - Node Network</title>
            </Helmet>
            <div className='register-background'>
                <div className={cardClass}>
                    {isDesktop && (
                        <Box className='auth-brand'>
                            <Box className='auth-brand-header'>
                                <Box className='auth-brand-badge'>
                                    <HubIcon sx={{ fontSize: 34 }} />
                                </Box>
                                <Box className='auth-brand-name'>Node Network</Box>
                            </Box>
                            <p className='auth-brand-sub'>
                                Únete a la red, crea tu perfil y empieza a compartir con tu comunidad.
                            </p>
                            <ul className='auth-brand-features'>
                                <li className='auth-brand-feature'>Crea tu perfil público</li>
                                <li className='auth-brand-feature'>Publica y comparte contenido</li>
                                <li className='auth-brand-feature'>Conecta con otros usuarios</li>
                            </ul>
                        </Box>
                    )}

                    <Box className='auth-panel'>
                        <Box className='auth-panel-inner'>
                            <h1 className='register-title'>Crea tu cuenta</h1>
                            <p className='auth-subtitle'>Únete a Node Network y empieza a conectar</p>

                            <form className='register-form' method='post' action='/register'>
                                <div className='auth-field-grid'>
                                    <TextField
                                        autoFocus={true}
                                        sx={authFieldSx}
                                        fullWidth
                                        size='medium'
                                        type='text'
                                        id='firstName'
                                        name='firstName'
                                        required
                                        label='Primer Nombre'
                                        value={formData.firstName}
                                        onChange={handleInputChange} />

                                    <TextField
                                        sx={authFieldSx}
                                        fullWidth
                                        size='medium'
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        required
                                        label='Apellidos'
                                        value={formData.lastName}
                                        onChange={handleInputChange} />
                                </div>

                                <div className='auth-field-grid'>
                                    <TextField
                                        sx={authFieldSx}
                                        fullWidth
                                        size='medium'
                                        type='text'
                                        id='username'
                                        name='username'
                                        required
                                        label='Nombre de usuario'
                                        value={formData.username}
                                        onChange={handleInputChange} />

                                    <TextField
                                        sx={authFieldSx}
                                        fullWidth
                                        size='medium'
                                        type='text'
                                        id='email'
                                        name='email'
                                        required
                                        label='Correo Electronico'
                                        value={formData.email}
                                        onChange={handleInputChange} />
                                </div>

                                <div className='password-field'>
                                    <TextField
                                        sx={authFieldSx}
                                        fullWidth
                                        size='medium'
                                        type='password'
                                        id='password'
                                        name='password'
                                        required
                                        label='Contraseña'
                                        value={formData.password}
                                        onChange={handleInputChange} />

                                    <TextField
                                        sx={authFieldSx}
                                        fullWidth
                                        size='medium'
                                        type='password'
                                        id='pwdConfirmation'
                                        name='pwdConfirmation'
                                        required
                                        label='Confirma la contraseña'
                                        value={formData.pwdConfirmation}
                                        onChange={handleInputChange} />
                                </div>

                                <Button
                                    sx={{ ...authPrimaryButtonSx, mt: '6px' }}
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    onClick={sendForm}
                                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.pwdConfirmation}
                                >
                                    Registrar
                                </Button>
                            </form>

                            <Box className='register-link'>
                                <p><span className='muted'>¿Ya tienes una cuenta?</span> <Link id='register' to='/'>Inicia sesión</Link></p>
                            </Box>
                        </Box>
                    </Box>
                </div>

                <AuthSnackbar open={open} message={gatheredState} severity={alertSeverity} pending={!state} onClose={preHandleClose} />
            </div>
        </>
    );
};

export default Register;
