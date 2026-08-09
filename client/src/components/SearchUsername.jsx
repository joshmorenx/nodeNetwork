import { useEffect } from 'react'
import { Button, TextField, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import useGenerateRecoveryLink from '../hooks/useGenerateRecoveryLink.jsx'
import { authFieldSx, authPrimaryButtonSx } from './authSx';

export default function SearchUsername({ isDesktop, isTablet, isMobile, handleFoundUser }) {
    const { data, userStatus, handleInputChange, sendRequest } = useGenerateRecoveryLink({
        inputData: {
            username: ''
        }
    })

    useEffect(()=>{
        (userStatus) && handleFoundUser(userStatus)
    }, [userStatus])

    const cardClass = isMobile ? 'auth-card auth-card-mobile' : 'auth-card auth-card-narrow';

    return (
        <Box className={cardClass}>
            <Box className="auth-panel auth-panel-narrow">
                <Box className="auth-panel-inner">
                    <h1 className="login-title">Recupera tu cuenta</h1>
                    <p className="auth-subtitle">Ingresa tu nombre de usuario y te enviaremos un enlace de recuperación.</p>

                    <Box className="auth-info-box">
                        Ingresa tu nombre de usuario y después haz clic en recuperar.
                    </Box>

                    <Box className="login-form">
                        <TextField
                            autoFocus={true}
                            sx={authFieldSx}
                            fullWidth
                            size='medium'
                            type="text"
                            id="username"
                            name="username"
                            required
                            label="Nombre de usuario"
                            value={data.username}
                            onChange={handleInputChange}
                        />

                        <Button
                            sx={{ ...authPrimaryButtonSx, mt: '6px' }}
                            size='large'
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={sendRequest}
                            disabled={!data.username}
                        >
                            Recuperar
                        </Button>
                    </Box>

                    <Box className="auth-back-link">
                        <Link to='/'>Volver al inicio</Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
