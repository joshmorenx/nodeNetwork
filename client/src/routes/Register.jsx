// import { handleInputChange, sendForm, state, formData } from './hooks/useForm.jsx'
import useRegisterForm from '../hooks/useRegisterForm';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Alert, Snackbar, Box } from '@mui/material/'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AuthBrand from '../components/AuthBrand';
import '../assets/styles.css';
import '../assets/index.css';
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';

const Register = () => {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const navigate = useNavigate();
    const { handleInputChange, sendForm, handleClose, registryCompletion, state, open, formData } = useRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        pwdConfirmation: '',
    })
    const [gatheredState, setGatheredState] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (registryCompletion) {
        setTimeout(() => {
            navigate('/');
        }, 1000 + 3000 * Math.random());
    }

    const preHandleClose = (event, reason) => {
        handleClose(event, reason);
    }

    useEffect(() => {
        state ? setGatheredState(state) : setGatheredState('Por favor, Espere...');
    }, [state])

    return (
        <>
            <Helmet>
                <title>Register - Node Network</title>
            </Helmet>
            <div className='register-background'>
                <Box className="login-page">
                    {isDesktop && <AuthBrand />}
                    <Box className="login-card-wrap">
                        <div className={`login-card ${isDesktop ? 'register-container' : isTablet ? 'register-container-tablet' : 'register-container-mobile'}`}>
                            <h1 className="register-title">Registro Nuevo</h1>
                            <p className="login-subtitle">Crea tu cuenta y forma parte de la red</p>
                            <form className={isDesktop ? 'register-form' : isTablet ? 'register-form-tablet' : 'register-form-mobile'} method="post" action="/register">

                                <TextField
                                    autoFocus={true}
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    label='Primer Nombre'
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (<PersonOutlineIcon className="login-field-icon" />)
                                    }}
                                />

                                <TextField
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    label='Apellidos'
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (<BadgeOutlinedIcon className="login-field-icon" />)
                                    }}
                                />

                                <TextField
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    label='Nombre de usuario'
                                    type="text"
                                    id="username"
                                    name="username"
                                    required
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (<AlternateEmailIcon className="login-field-icon" />)
                                    }}
                                />

                                <TextField
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    label='Correo Electronico'
                                    type="text"
                                    id="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (<EmailOutlinedIcon className="login-field-icon" />)
                                    }}
                                />

                                <div className='password-field'>
                                    <TextField
                                        sx={{ mb: 2 }}
                                        label='Contraseña'
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="new-password"
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
                                        sx={{ mb: 2 }}
                                        label='Confirma la contraseña'
                                        type={showConfirmation ? "text" : "password"}
                                        id="pwdConfirmation"
                                        name="pwdConfirmation"
                                        required
                                        autoComplete="new-password"
                                        value={formData.pwdConfirmation}
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
                                </div>

                                <Button
                                    className="login-submit-button"
                                    sx={{ mt: 0.5, mb: 0.5 }}
                                    onClick={sendForm}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.pwdConfirmation}
                                >
                                    Registrar
                                </Button>
                            </form>
                            <Box className="login-separator"><span>¿Ya tienes una cuenta?</span></Box>
                            <div className="register-link">
                                <p id="register"><Link to='/'> Inicia sesión </Link></p>
                            </div>

                        </div>
                    </Box>
                </Box>
                {/* { state } */}
                <Snackbar sx={{ width: '100%', ml: 'auto', mr: 'auto', mt: '-13vh' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={!state ? 999999 : 5000} onClose={preHandleClose}>
                    <Alert onClose={preHandleClose} severity="info" sx={{ width: '100%' }}>
                        {gatheredState}
                    </Alert>
                </Snackbar>

            </div>
        </>
    );
};

export default Register;
