import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Link, TextField, Typography } from "@mui/material";

export default function PopUpPostingBox({ token, handleClosePostingBoxPopUp }) {

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            handleClosePostingBoxPopUp()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
    }, [])


    return (
        <Box className="posting-box-popup">
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, bgcolor: '#00000099' }} onClick={handleClosePostingBoxPopUp}></Box>
            <Box sx={{ width: '35%', borderRadius: '5px', padding: '0.5%', bgcolor: '#fadea7', position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 101 }}>

                <Box sx={{ border: '1px 1px 0 0 solid black', mb: '2%' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }} align='center' >Crear una publicación</Typography>
                </Box>

                <Box sx={{ mr: 1, mb: 1, ml: 1 }}>
                    <TextField
                    multiline
                    variant="filled"
                    size="small"
                    // placeholder='Escribe lo que piensas...'
                    label="Escribe lo que piensas..."
                    sx={{ width: '100%' }}
                    rows={10}
                    />
                </Box>
                
                <Box sx={{ display : 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Link sx={{ color: 'blueviolet' }} width={'100%'} textAlign={'center'} href="#"><CollectionsIcon/> Añadir una imagen/video</Link>
                    <Link sx={{ color: 'orangered' }} width={'100%'} textAlign={'center'} href="#"><LocationOnIcon/> Añadir una ubicación</Link>
                </Box>
                
                <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1 }}>
                    <Button variant="contained" size="small" fullWidth>
                        Publicar
                    </Button>
                </Box>

            </Box>
        </Box>
    )
}

PopUpPostingBox.propTypes = {
    token: PropTypes.string,
    handleClosePostingBoxPopUp: PropTypes.func
}