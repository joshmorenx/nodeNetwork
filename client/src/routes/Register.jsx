// import { handleInputChange, sendForm, state, formData } from './hooks/useForm.jsx'
import { useNavigate } from 'react-router-dom';
import useRegisterForm from '../hooks/useRegisterForm';
import { Link } from 'react-router-dom'
import { TextField, Button } from '@mui/material';
import '../assets/styles.css';
import '../assets/index.css';

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
            <div className='register-background'>
                <div className="register-container">
                    <h1 className="register-title">Registro Nuevo</h1>
                    <form className="register-form" method="post" action="/register">
                        
                        {/* <input type="text" name="firstName" placeholder="Nombre" required value={formData.firstName} onChange={handleInputChange} />
                        <input type="text" name="lastName" placeholder="Apellido" required value={formData.lastName} onChange={handleInputChange} />
                        <br />
                        <input type="text" name="email" placeholder="Correo" required value={formData.email} onChange={handleInputChange} />
                        <input type="text" name="username" placeholder="Usuario" required value={formData.username} onChange={handleInputChange} />
                        <br />
                        <input type="password" name="password" placeholder="Contraseña" required value={formData.password} onChange={handleInputChange} />
                        <input type="password" name="pwdConfirmation" placeholder="Confirmación Contraseña" required value={formData.pwdConfirmation} onChange={handleInputChange} />
                        <button type="submit" onClick={sendForm}> Registro </button> */}

                        <TextField
                        sx={{ mt : 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        label='Primer Nombre'
                        size='small'         
                        type="text"  
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}/>

                        <TextField
                        sx={{ mt : 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        label='Apellidos'
                        size='small'           
                        type="text"  
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}/>

                        <TextField
                        sx={{ mt : 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        label='Nombre de usuario'
                        size='small'           
                        type="text"  
                        id="username"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleInputChange}/>

                        <TextField
                        sx={{ mt : 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        label='Correo Electronico'
                        size='small'           
                        type="text"  
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}/>

                        <div className='password-field' style={{ display: 'flex' }}>
                            <TextField
                            sx={{ mt : 3, width: '100%', ml: 'auto', mr: '1vw' }}
                            label='Contraseña'
                            size='small'           
                            type="password"  
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}/>

                            <TextField
                            sx={{ mt : 3, width: '100%', ml: '1vw', mr: 'auto' }}
                            label='Confirma la contraseña'
                            size='small'           
                            type="password"  
                            id="pwdConfirmation"
                            name="pwdConfirmation"
                            required
                            value={formData.pwdConfirmation}
                            onChange={handleInputChange}/>
                        </div>

                        <Button 
                        sx={{ mt : 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        onClick={sendForm}
                        fullWidth
                        variant="contained"
                        color="primary"
                        type=''>
                            Registrar
                        </Button>
                    </form>
                    { state }

                    <p className='mt-5 mb-5'>Ya tienes una cuenta? <Link id="register" to='/'> Inicia sesión </Link></p>
                </div>
            </div>
        </>
    );
};

export default Register;
