import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, TextField, Alert, Snackbar, Box } from '@mui/material/';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginDisplayer({ handleInputChange, formData, sendForm, userInfo, open, preHandleClose, loginData }) {
    const [showPassword, setShowPassword] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const desktopStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
    }

    const mobileStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
    }

    return (
        <>
            <Box className='login-background'>
                <Box className={`${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')} fadeIn`}>
                    <h1 className="login-title">Iniciar sesión</h1>
                    <form className={isDesktop ? 'login-form' : (isTablet ? 'login-form-tablet' : 'login-form-mobile')} method="post" action="/">

                        {/* <input type="text" id="username" name="username" placeholder="Nombre de usuario" required value={formData.username} onChange={handleInputChange}/>
                        <input type="password" id="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleInputChange}/>                        
                        <button type="submit" onClick={sendForm}>Iniciar sesión</button> */}

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
                {/* <Box className="login-message">{loginData}</Box> */}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={5000} onClose={preHandleClose}>
                    <Alert onClose={preHandleClose} severity="info" sx={{ width: '100%' }}>
                        {loginData}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}

LoginDisplayer.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    sendForm: PropTypes.func.isRequired,
    userInfo: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    preHandleClose: PropTypes.func.isRequired,
    loginData: PropTypes.string.isRequired
}