import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, useMediaQuery, Button, CircularProgress } from "@mui/material";
import { useGetVerifyExpiredToken } from "../hooks/useGetVerifyExpiredToken.jsx";
import ResetPassword from "../components/ResetPassword.jsx";
import { Helmet } from "react-helmet";
import AuthBrand from "../components/AuthBrand";

export default function Reset() {
    const navigate = useNavigate();
    const { token } = useParams();
    const { expired, error, success, msg, loading, decodedToken, getVerifyExpiredToken } = useGetVerifyExpiredToken();
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');

    useEffect(() => {
        if (token && !success) {
            getVerifyExpiredToken(token);
        } else if (!token) {
            navigate('/');
        } else {
            // Do nothing
        }
    }, [token, success]);

    return (
        <Box className="login-background">
            <Helmet><title>Reset Password - Node Network</title></Helmet>
            <Box className="login-page">
                {isDesktop && <AuthBrand />}
                <Box className="login-card-wrap">
                    <Box className={`login-card ${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
                                <CircularProgress />
                            </Box>
                        ) : expired ? (
                            <>
                                <h1 className="login-title">Token expirado</h1>
                                <p className="login-subtitle">{msg} por favor genera un nuevo token de recuperación.</p>
                                <Button className="login-submit-button" fullWidth variant="contained" color="primary" onClick={() => navigate('/forgot')}>Generar nuevo token de recuperación</Button>
                            </>
                        ) : error ? (
                            <>
                                <h1 className="login-title">Token inválido</h1>
                                <p className="login-subtitle">El token de recuperación no es valido.</p>
                                <Button className="login-submit-button" fullWidth variant="contained" color="primary" onClick={() => navigate('/forgot')}>Generar nuevo token de recuperación</Button>
                            </>
                        ) : (
                            decodedToken &&
                            <ResetPassword token={token} decodedToken={decodedToken} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}