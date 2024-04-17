import useLoginForm from '../hooks/useLoginForm';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import '../assets/styles.css';
import '../assets/index.css';
import { Button, TextField } from '@mui/material/'



const Login = () => {
    const { handleInputChange, sendForm, state, tokenState, userInfo, ...formData } = useLoginForm({
        username: '',
        password: ''
    });

    useEffect(() => {
        try {
            if (tokenState) {
                Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' });
                window.location.href = '/';
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
                        sx={{ mt : 4, width: '25vw', ml: 'auto', mr: 'auto' }}
                        size='small'
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nombre de usuario"
                        required
                        value={formData.username}
                        onChange={handleInputChange}/>

                        <TextField 
                        sx={{ mt : 4, width: '25vw', ml: 'auto', mr: 'auto' }}
                        size='small'
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
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
                    <div className="login-message">{state}</div>
                    <div className="user-info">{userInfo.user}</div>
                    <div className="register-link">
                        <p id="register"><Link to='/register'>Regístrate</Link></p>
                        <p id="recover"><Link to='/forgot'>Recuperar contraseña</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
