import '../assets/styles.css';
import '../assets/index.css';
import { useMediaQuery, Box, Button } from '@mui/material';
import SearchUsername from '../components/SearchUsername.jsx'
import { useState } from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import AuthBrand from '../components/AuthBrand';

export default function Forgot() {
    const [foundUser, setFoundUser] = useState(null)
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');

    const handleFoundUser = (found) => {
        setFoundUser(found)
    }

    return (
        <>
        <Helmet>
            <title>Recover Password - Node Network</title>
        </Helmet>
            <Box className="login-background">
                <Box className="login-page">
                    {isDesktop && <AuthBrand />}
                    <Box className="login-card-wrap">
                        {!foundUser ?
                            <SearchUsername isDesktop={isDesktop} isTablet={isTablet} handleFoundUser={handleFoundUser} /> :
                            (foundUser === "found" ?
                                <Box className={`login-card ${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
                                    <h1 className="login-title">Revisa tu correo</h1>
                                    <p className="login-subtitle">Correo de recuperación enviado, Verifica tu correo registrado para recuperar tu cuenta.</p>
                                    <Box className="register-link">
                                        <p id="register"><Link to='/'>Volver al inicio de sesión</Link></p>
                                    </Box>
                                </Box> :
                                foundUser === "notFound" ?
                                    <Box className={`login-card ${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
                                        <h1 className="login-title">Usuario no encontrado</h1>
                                        <p className="login-subtitle">usuario NO encontrado, por favor intenta de nuevo</p>
                                        <Button className="login-submit-button" fullWidth variant="contained" color="primary" onClick={() => handleFoundUser(null)}>
                                            Reintentar
                                        </Button>
                                        <Box className="register-link">
                                            <p id="register"><Link to='/'>Volver al inicio de sesión</Link></p>
                                        </Box>
                                    </Box>
                                    : null
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
}
