import { Helmet } from "react-helmet";
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthBrand from '../components/AuthBrand';
import '../assets/styles.css';
import '../assets/index.css';

export default function NotFound() {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>404 - Node Network</title>
            </Helmet>
            <Box className="login-background">
                <Box className="login-page">
                    {isDesktop && <AuthBrand />}
                    <Box className="login-card-wrap">
                        <Box className={`login-card ${isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}`}>
                            <div className="login-404">404</div>
                            <h1 className="login-title">Página no encontrada</h1>
                            <p className="login-subtitle">¡Vaya! No encontramos la página que estás buscando.</p>
                            <Button className="login-submit-button" fullWidth variant="contained" color="primary" onClick={() => navigate('/')}>
                                Regresar a la página principal
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}