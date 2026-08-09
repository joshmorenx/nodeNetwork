import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';
import { createPortal } from 'react-dom';
import { authAlertSx } from './authSx';

// Shared snackbar used by the auth views (login / register / reset password).
// `pending` keeps the snackbar open indefinitely while waiting for a response.
// Rendered through a portal to document.body so no ancestor with overflow or a
// transform (e.g. the animated .auth-card) can clip it or become its containing block.
export default function AuthSnackbar({ open, message, severity = 'info', onClose, pending = false }) {
    const snackbar = (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={pending ? 999999 : 5000}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={severity} sx={authAlertSx}>
                {message}
            </Alert>
        </Snackbar>
    );
    return createPortal(snackbar, document.body);
}

AuthSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    pending: PropTypes.bool,
};


