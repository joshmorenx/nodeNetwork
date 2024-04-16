import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
export default function register(){
    const navigate = useNavigate()
    return(
        <> 
        <Container maxWidth="lg">
            <h1>Work in progress </h1>
            <Button variant='contained' onClick={() => navigate('/')}>Volver Al inicio</Button>
        </Container>
        </>
    )
}
