import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { CircularProgress } from '@mui/material';
import { useGetVerifyExpiredToken } from "../hooks/useGetVerifyExpiredToken.jsx";
import ResetPassword from "../components/ResetPassword.jsx";
import { Helmet } from "react-helmet";
import LockResetIcon from '@mui/icons-material/LockReset';
import { authPrimaryButtonSx } from "../components/authSx";

export default function Reset() {
    const navigate = useNavigate();
    const { token } = useParams();
    const { expired, error, success, msg, loading, decodedToken, getVerifyExpiredToken } = useGetVerifyExpiredToken();
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    useEffect(() => {
        if (token && !success) {
            getVerifyExpiredToken(token);
        } else if (!token) {
            navigate('/');
        } else {
            // Do nothing
        }
    }, [token, success]);

    const cardClass = isMobile ? 'auth-card auth-card-mobile' : 'auth-card auth-card-narrow';

    return (
        <Box className="login-background">
            <Helmet><title>Reset Password - Node Network</title></Helmet>
            <Box className={cardClass}>
                <Box className="auth-panel auth-panel-narrow">
                    <Box className="auth-panel-inner">
                        <h1 className="login-title">Restablecer contraseña</h1>
                        {loading ? (
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress sx={{ color: '#7c3aed' }} />
                            </Box>
                        ) : expired ? (
                            <Box className="auth-message">
                                <Box className="auth-message-icon err">
                                    <LockResetIcon sx={{ fontSize: 30 }} />
                                </Box>
                                <p className="auth-message-text">
                                    <strong>{msg}</strong> por favor genera un nuevo token de recuperación.
                                </p>
                                <Button sx={{ ...authPrimaryButtonSx, mt: '6px', maxWidth: 340 }} variant="contained" onClick={() => navigate('/forgot')}>
                                    Generar nuevo token de recuperación
                                </Button>
                            </Box>
                        ) : error ? (
                            <Box className="auth-message">
                                <Box className="auth-message-icon err">
                                    <LockResetIcon sx={{ fontSize: 30 }} />
                                </Box>
                                <p className="auth-message-text">
                                    El token de recuperación no es valido.
                                </p>
                            </Box>
                        ) : (
                            decodedToken &&
                            <ResetPassword token={token} decodedToken={decodedToken} isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
