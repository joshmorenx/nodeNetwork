import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, TextField, Button } from "@mui/material";
import { useGetVerifyExpiredToken } from "../hooks/useGetVerifyExpiredToken.jsx";
import { CircularProgress } from '@mui/material';
import ResetPassword from "../components/ResetPassword.jsx";

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

    return (
        <Box className="login-background">
            <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: 'fit-content' }} className={isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}>
                <Typography>
                    {loading ? <CircularProgress /> : (
                        expired ? (
                            <Box>
                                <Typography sx={{ mb: 2, mt: 3, fontSize: isDesktop ? 20 : (isTablet ? 15 : 10) }}>
                                    {msg} por favor genera un nuevo token de recuperación.
                                </Typography>
                                <Button sx={{ mt: 2, mb: 3, width: '100%', fontSize: isDesktop ? 20 : (isTablet ? 15 : 10) }} variant="contained" onClick={() => navigate('/forgot')}>Generar nuevo token de recuperación</Button>
                            </Box>
                        ) : (
                            error ?
                                (
                                    <Typography>
                                        El token de recuperación no es valido.
                                    </Typography>) :
                                (
                                    decodedToken &&
                                    <ResetPassword token={token} decodedToken={decodedToken} isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
                                )
                        )
                    )}
                </Typography>
            </Box>
        </Box>
    )
}