import useLoginForm from '../hooks/useLoginForm';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
const Login = () => {

    const { handleInputChange, sendForm, state, tokenState, userInfo, ...formData } = useLoginForm({
        username: '',
        password: ''
    })

    useEffect(() => {
        // Guardar tokenState en la cookie del LocalStorage
        if (tokenState) {
            // localStorage.setItem('token', tokenState);
            Cookies.set('token', tokenState, { expires: 7, secure: true, sameSite: 'Strict' });
            window.location.href = '/';
            // console.log(localStorage.getItem('token'));
        }
    }, [tokenState]);

    return (
        <>
            <form method="post" action="/">
                <input type="text" name="username" placeholder="Nombre de usuario" required value={formData.username} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleInputChange} />
                <button type="submit" onClick={sendForm}>Iniciar sesión</button>
            </form>
            {state}
            <br />
            {userInfo.user}
            <p />Aun no tienes una cuenta? <p /><Link to='/register'>Registrate</Link>
        </>
    );
};

export default Login;
