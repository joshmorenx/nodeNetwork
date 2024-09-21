import useLoginForm from '../hooks/useLoginForm';
import { useEffect, useState, useContext } from 'react'
import '../assets/styles.css';
import '../assets/index.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Alert, Snackbar, Box, Typography } from '@mui/material/';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Forgot() {
    const [showPassword, setShowPassword] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    return (
        <>
            <Box className="login-background"></Box>
            <Box sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className={isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}>

                <Typography sx={{ mt: 3, fontSize: isDesktop ? 40 : (isTablet ? 30 : 20) }} className="login-title">Recupera tu cuenta</Typography>
                <Typography sx={{ mt: 1.5, fontSize: isDesktop ? 30 : (isTablet ? 20 : 15) }} className="login-title">Ingresa tu nombre de usuario</Typography>

                <form className={isDesktop ? 'login-form' : (isTablet ? 'login-form-tablet' : 'login-form-mobile')} method="post" action="/">

                    <TextField
                        autoFocus={true}
                        sx={{ mt: 3, mb: 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='small'
                        type="text"
                        id="username"
                        name="username"
                        required
                        label="Nombre de usuario"
                    // value={formData.username}
                    // onChange={handleInputChange}
                    />

                    <Button
                        sx={{ mt: 2, mb: 2, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='large'
                        variant="contained"
                        color="primary"
                    // type="submit"
                    // onClick={sendForm}
                    >
                        Buscar
                    </Button>

                </form>
            </Box>
        </>
    );
}
