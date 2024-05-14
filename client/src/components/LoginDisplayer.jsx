import PropTypes from 'prop-types';
import { Button, TextField, Alert, Snackbar } from '@mui/material/';
import { Link } from 'react-router-dom';

export default function LoginDisplayer({ handleInputChange, formData, sendForm, userInfo, open, preHandleClose, loginData }) {
    return (
        <>
            <div className='login-background'>
                <div className="login-container">
                    <h1 className="login-title">Iniciar sesión</h1>
                    <form className="login-form" method="post" action="/">
                        
                        {/* <input type="text" id="username" name="username" placeholder="Nombre de usuario" required value={formData.username} onChange={handleInputChange}/>
                        <input type="password" id="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleInputChange}/>                        
                        <button type="submit" onClick={sendForm}>Iniciar sesión</button> */}

                        <TextField
                        autoFocus={true}
                        sx={{ mt : 4, mb : 3, width: '25vw', ml: 'auto', mr: 'auto' }}
                        size='large'
                        type="text"
                        id="username"
                        name="username"
                        required
                        label = "Nombre de usuario"
                        value={formData.username}
                        onChange={handleInputChange}/>

                        <TextField 
                        sx={{ mt :2, mb : 3, width: '25vw', ml: 'auto', mr: 'auto' }}
                        size='large'
                        type="password"
                        id="password"
                        name="password"
                        label = "Contraseña"
                        required
                        value={formData.password}
                        onChange={handleInputChange}/>
                        
                        <Button 
                            sx={{ mt : 4, mb : 1, width: '25vw', ml: 'auto', mr: 'auto' }}
                            size='small'
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={sendForm}
                        >
                            Iniciar sesión
                        </Button>
                        
                    </form>
                    <div className="user-info">{userInfo.user}</div>
                    <div className="register-link">
                        <p id="register"><Link to='/register'>Regístrate</Link></p>
                        <p id="recover"><Link to='/forgot'>Recuperar contraseña</Link></p>
                    </div>
                </div>
                {/* <div className="login-message">{loginData}</div> */}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  open={open} autoHideDuration={5000} onClose={preHandleClose}>
                    <Alert onClose={preHandleClose} severity="info" sx={{ width: '100%' }}>
                        { loginData }
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

LoginDisplayer.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    sendForm: PropTypes.func.isRequired,
    userInfo: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    preHandleClose: PropTypes.func.isRequired,
    loginData: PropTypes.string.isRequired
}