// import { handleInputChange, sendForm, state, formData } from './hooks/useForm.jsx'
import { useNavigate } from 'react-router-dom';
import useRegisterForm from '../hooks/useRegisterForm';
import { Link } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();
    const { handleInputChange, sendForm, registryCompletion, state, ...formData } = useRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        pwdConfirmation: '',
    })

    if (registryCompletion) {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }

    return (
        <>
            <form method="post" action="/register">
                <input type="text" name="firstName" placeholder="Nombre" required value={formData.firstName} onChange={handleInputChange} />
                <input type="text" name="lastName" placeholder="Apellido" required value={formData.lastName} onChange={handleInputChange} />
                <br />
                <input type="text" name="email" placeholder="Correo" required value={formData.email} onChange={handleInputChange} />
                <input type="text" name="username" placeholder="Usuario" required value={formData.username} onChange={handleInputChange} />
                <br />
                <input type="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleInputChange} />
                <input type="password" name="pwdConfirmation" placeholder="Confirmación Contraseña" required value={formData.pwdConfirmation} onChange={handleInputChange} />
                <button type="submit" onClick={sendForm}> Registro </button>
            </form>
            { state }

            <p />Ya tienes una cuenta? <p /><Link to='/'> Inicia sesión </Link>
        </>
    );
};

export default Register;
