import '../assets/styles.css';
import '../assets/index.css';
import { useMediaQuery, Box } from '@mui/material';
import SearchUsername from '../components/SearchUsername.jsx'
import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import AuthSnackbar from '../components/AuthSnackbar';

export default function Forgot() {
    const [foundUser, setFoundUser] = useState(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const handleFoundUser = (found) => {
        setFoundUser(found)
    }

    useEffect(() => {
        if (foundUser) {
            setSnackbarOpen(true)
        }
    }, [foundUser])

    const preHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }

    const snackbarSeverity = foundUser === 'found' ? 'success' : foundUser === 'notFound' ? 'error' : 'info';
    const snackbarMessage = foundUser === 'found'
        ? 'Correo de recuperación enviado. Revisa tu correo registrado.'
        : foundUser === 'notFound'
            ? 'Usuario no encontrado, por favor intenta de nuevo.'
            : '';

    const cardClass = isMobile ? 'auth-card auth-card-mobile' : 'auth-card auth-card-narrow';

    return (
        <>
            <Helmet>
                <title>Recover Password - Node Network</title>
            </Helmet>
            <Box className="login-background">
                {!foundUser ?
                    <SearchUsername isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} handleFoundUser={handleFoundUser} /> :
                    (foundUser === "found" ?
                        <Box className={cardClass}>
                            <Box className="auth-panel auth-panel-narrow">
                                <Box className="auth-panel-inner">
                                    <Box className="auth-message">
                                        <Box className="auth-message-icon ok">
                                            <CheckCircleOutlinedIcon sx={{ fontSize: 30 }} />
                                        </Box>
                                        <p className="auth-message-text">
                                            Correo de recuperación enviado, Verifica tu correo registrado para recuperar tu cuenta.
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box> :
                        foundUser === "notFound" ?
                            <Box className={cardClass}>
                                <Box className="auth-panel auth-panel-narrow">
                                    <Box className="auth-panel-inner">
                                        <Box className="auth-message">
                                            <Box className="auth-message-icon err">
                                                <ErrorOutlinedIcon sx={{ fontSize: 30 }} />
                                            </Box>
                                            <p className="auth-message-text">
                                                usuario NO encontrado, por favor intenta de nuevo
                                            </p>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            : null
                    )
                }

                <AuthSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={preHandleClose} />
            </Box>
        </>
    );
}
