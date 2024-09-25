import { useEffect } from 'react'
import { Button, TextField, Link, Box, Typography } from '@mui/material/';
import { Navigate, useNavigate } from 'react-router-dom';
import useGenerateRecoveryLink from '../hooks/useGenerateRecoveryLink.jsx'

export default function SearchUsername({ isDesktop, isTablet, isMobile, handleFoundUser }) {
    const Navigate = useNavigate()
    const { data, userStatus, emailSent, error, handleInputChange, sendRequest } = useGenerateRecoveryLink({
        inputData: {
            username: ''
        }
    })

    useEffect(()=>{
        (userStatus) && handleFoundUser(userStatus)
    },[userStatus])

    return (
        <>
            <Box sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className={isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}>

                <Typography sx={{ mt: 3, fontSize: isDesktop ? 35 : (isTablet ? 30 : 20) }} className="login-title">Recupera tu cuenta</Typography>
                <Box sx={{ mt: 2, borderRadius: '5px', width: '100%', textAlign: 'left', border: '1px solid black' }}>
                    <Typography sx={{ m: 2, fontSize: isDesktop ? 20 : (isTablet ? 15 : 10) }} >Ingresa tu nombre de usuario y despues haz click en recuperar</Typography>
                </Box>

                <Box className={isDesktop ? 'login-form' : (isTablet ? 'login-form-tablet' : 'login-form-mobile')}>

                    <TextField
                        autoFocus={true}
                        sx={{ mt: 3, mb: 3, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='small'
                        type="text"
                        id="username"
                        name="username"
                        required
                        label="Nombre de usuario"
                        value={data.username}
                        onChange={handleInputChange}
                    />

                    <Button
                        sx={{ mb: 2, width: '100%', ml: 'auto', mr: 'auto' }}
                        size='large'
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={sendRequest}
                        disabled={!data.username}
                    >
                        Recuperar
                    </Button>

                </Box>

                <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                    <Link sx={{ cursor: 'pointer' }} onClick={() => (Navigate('/'))}>Volver</Link>
                </Box>
            </Box>
        </>
    )
}