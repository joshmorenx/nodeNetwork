// import { handleInputChange, sendForm, state, formData } from './hooks/useForm.jsx'
import useRegisterForm from '../hooks/useRegisterForm';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Alert, Snackbar } from '@mui/material/'
import { Link } from 'react-router-dom'
import '../assets/styles.css';
import '../assets/index.css';

const Register = () => {
    const navigate = useNavigate();
    const { handleInputChange, sendForm, handleClose, registryCompletion, state, open, formData } = useRegisterForm({
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
        }, 1000 + 3000 * Math.random());
    }

    const preHandleClose = (event, reason) => {
        handleClose(event, reason);
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
                        autoFocus={true}
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
                    {/* { state } */}
                    <Snackbar sx={{ width: '100%', ml: 'auto', mr: 'auto', mt: '-13vh' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  open={open} autoHideDuration={5000} onClose={preHandleClose}>
                        <Alert onClose={preHandleClose} severity="info" sx={{ width: '100%' }}>
                            { state }
                        </Alert>
                    </Snackbar>
                    <p className='mt-5 mb-5'>Ya tienes una cuenta? <Link id="register" to='/'> Inicia sesión </Link></p>
                </div>
                
            </div>
        </>
    );
};

export default Register;
