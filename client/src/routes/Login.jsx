import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLoginForm from '../hooks/useLoginForm';
import Cookies from 'js-cookie';
import '../assets/styles.css';

const Login = () => {
    const { handleInputChange, sendForm, state, tokenState, userInfo, ...formData } = useLoginForm({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (tokenState) {
            Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' });
            window.location.href = '/';
        }
    }, [tokenState]);

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            <form className="login-form" method="post" action="/">
                
                <input type="text" id="username" name="username" placeholder="Nombre de usuario" required value={formData.username} onChange={handleInputChange}/>

                <input type="password" id="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleInputChange}/>
                
                <button type="submit" onClick={sendForm}>Iniciar sesión</button>
            </form>
            <div className="login-message">{state}</div>
            <div className="user-info">{userInfo.user}</div>
            <div className="register-link">
                <p>Aún no tienes una cuenta? <Link to='/register'>Regístrate</Link></p>
            </div>
        </div>
    );
};

export default Login;
