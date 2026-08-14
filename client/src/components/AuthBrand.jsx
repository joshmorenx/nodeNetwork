import { Box } from '@mui/material';

export default function AuthBrand() {
    return (
        <Box className="login-brand">
            <Box className="login-brand-nodes" aria-hidden="true">
                <span className="login-node login-node-1" />
                <span className="login-node login-node-2" />
                <span className="login-node login-node-3" />
                <span className="login-node login-node-4" />
                <span className="login-node login-node-5" />
            </Box>
            <Box className="login-brand-logo">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="18" cy="18" r="7" fill="currentColor" />
                    <circle cx="46" cy="14" r="5.5" fill="currentColor" opacity="0.85" />
                    <circle cx="42" cy="46" r="8" fill="currentColor" opacity="0.9" />
                    <circle cx="17" cy="45" r="4.5" fill="currentColor" opacity="0.7" />
                    <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    <circle cx="46" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                    <path d="M18 18 46 14M46 14 42 46M42 46 17 45M17 45 18 18" stroke="currentColor" strokeWidth="2" opacity="0.55" />
                </svg>
            </Box>
            <h1 className="login-brand-title">Node <span>Network</span></h1>
            <p className="login-brand-tagline">Conecta, comparte y crece en tu red.</p>
            <Box className="login-brand-features">
                <Box className="login-brand-feature"><span className="login-brand-check">✓</span>Feed en tiempo real</Box>
                <Box className="login-brand-feature"><span className="login-brand-check">✓</span>Notificaciones al instante</Box>
                <Box className="login-brand-feature"><span className="login-brand-check">✓</span>Perfiles y galerías personalizadas</Box>
            </Box>
        </Box>
    )
}
