// Shared MUI sx styles used by the auth views (login / register / reset password).
// Keeping them in one place guarantees every field, button and alert keeps the same look.

export const authFieldSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        '& fieldset': { borderColor: '#e2e8f0' },
        '&:hover fieldset': { borderColor: '#c4b5fd' },
        '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.12)' },
        '&.Mui-focused fieldset': { borderColor: '#7c3aed', borderWidth: '1.5px' },
    },
    '& .MuiInputLabel-root': {
        color: '#64748b',
        '&.Mui-focused': { color: '#7c3aed' },
    },
    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
        backgroundColor: '#ffffff',
        paddingRight: '6px',
    },
};

export const authPrimaryButtonSx = {
    width: '100%',
    py: 1.4,
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '0.95rem',
    letterSpacing: '0.3px',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    boxShadow: '0 12px 24px -10px rgba(109, 40, 217, 0.55)',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)',
        boxShadow: '0 16px 28px -10px rgba(109, 40, 217, 0.7)',
        transform: 'translateY(-1px)',
    },
    '&:active': { transform: 'translateY(0)' },
    '&:disabled': {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(135deg, #c4b5fd 0%, #a5b4fc 100%)',
        color: '#ffffff',
        boxShadow: 'none',
    },
};

export const authAlertSx = {
    width: '100%',
    borderRadius: '12px',
    fontWeight: 500,
    boxShadow: '0 16px 40px -16px rgba(0, 0, 0, 0.4)',
};
