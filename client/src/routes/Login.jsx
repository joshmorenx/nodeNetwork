import useLoginForm from '../hooks/useLoginForm';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button, TextField, Alert, Snackbar } from '@mui/material/'
import Cookies from 'js-cookie'
import '../assets/styles.css';
import '../assets/index.css';



const Login = () => {
    const { handleInputChange, sendForm, handleClose, loginData, tokenState, userInfo, open, ...formData } = useLoginForm({
        username: '',
        password: '',
    });

    const preHandleClose = (event, reason) => {
        handleClose(event, reason);
    }

    useEffect(() => {
        try {
            if (tokenState) {
                Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000 + 5000 * Math.random());
            }
        } catch (error) {
            console.error(error);
        }
    }, [tokenState]);

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
                        sx={{ mt : 4, width: '25vw', ml: 'auto', mr: 'auto' }}
                        size='small'
                        type="text"
                        id="username"
                        name="username"
                        required
                        label = "Nombre de usuario"
                        value={formData.username}
                        onChange={handleInputChange}/>

                        <TextField 
                        sx={{ mt : 4, width: '25vw', ml: 'auto', mr: 'auto' }}
                        size='small'
                        type="password"
                        id="password"
                        name="password"
                        label = "Contraseña"
                        required
                        value={formData.password}
                        onChange={handleInputChange}/>
                        
                        <Button 
                            sx={{ mt : 4, width: '25vw', ml: 'auto', mr: 'auto' }}
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
    );
};

export default Login;
