import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Input, Link, TextField, Typography } from "@mui/material";
import useCreateNewPost from '../hooks/useCreateNewPost.jsx';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';

export default function PopUpPostingBox({ token, handleClosePostingBoxPopUp, handleFeedReload }) {
    const [selectedImageFile, setSelectedImageFile] = useState(null); // Default image file
    const [selectedImageUrl, setSelectedImageUrl] = useState(null); // Default image URL
    const [imageOver, setImageOver] = useState(false);
    const { sendRequest, msg, error, success, handleInputChange, postForm, loading } = useCreateNewPost({
        token, initialForm: {
            content: '',
            latitude: '',
            longitude: '',
            image: null
        }
    })

    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

    const reactionTextStyles = {
        fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '2.5vw',
        marginLeft: '5px'
    }

    const popUpEditStyles = {
        width: isDesktop ? '35rem' : isTablet ? '60%' : '95%',
        borderRadius: '5px',
        padding: '0.5%',
        bgcolor: '#fadea7',
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1002
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            handleClosePostingBoxPopUp()
        }
    }

    const getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                postForm.latitude = position.coords.latitude
                postForm.longitude = position.coords.longitude
                alert('La ubicación se ha guardado')
            })
        }
        else {
            alert('Has denegado compartir la ubicación')
        }
    }

    const openFileSelector = () => {
        document.getElementById('imagefile').click()
    }

    const handleImageChange = (event) => {
        setSelectedImageFile(event.target.files[0])
        setSelectedImageUrl(URL.createObjectURL(event.target.files[0]))
    }

    const clearInput = () => {
        document.getElementById('imagefile').value = null
        setSelectedImageFile(null)
        setSelectedImageUrl(null)
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
    }, [])

    useEffect(() => {
        if (success) {
            handleClosePostingBoxPopUp()
            handleFeedReload()
        }
    }, [success])


    return (
        <Box className="posting-box-popup">
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1001, bgcolor: '#00000099' }} onClick={handleClosePostingBoxPopUp}></Box>
            <Box className="bgx-black" sx={popUpEditStyles}>

                <Box sx={{ border: '1px 1px 0 0 solid black', mb: '2%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant={isDesktop ? 'h4' : isTablet ? 'h6' : 'h7'} sx={{ fontWeight: 'bold' }} align='center' >Crear una publicación</Typography>
                </Box>

                <Box sx={{ mr: 0, mb: 0, ml: 0 }}>
                    <TextField
                        className='bgx-white'
                        multiline
                        variant="filled"
                        size="small"
                        label="Escribe lo que piensas..."
                        sx={{ width: '100%' }}
                        rows={isDesktop ? 10 : isTablet ? 9 : 6}
                        onChange={handleInputChange}
                        value={postForm.content}
                        id="content"
                        name="content"
                        inputProps={{ autoFocus: true }}
                        required
                    />
                </Box>

                <Box sx={{ display: 'none', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <TextField
                        type='number'
                        name="latitude"
                        id="latitude"
                        label="Latitud"
                        onChange={handleInputChange}
                        value={postForm.latitude}
                    />

                    <TextField
                        type='number'
                        name="longitude"
                        id="longitude"
                        label="Longitud"
                        onChange={handleInputChange}
                        value={postForm.longitude}
                    />

                </Box>
                <Box>
                    <input style={{ display: 'none' }} id='imagefile' type='file' onChange={handleImageChange} accept=".jpg, .jpeg, .png, .jfif, .raw" />
                    {selectedImageUrl && (
                        <Box sx={{ display: 'inline-flex', alignItems: 'top', mt: 2, width: '100%', border: '1px solid gray' }}>
                            <CloseIcon onClick={clearInput} sx={{ bgcolor: 'red', cursor: 'pointer' }} />
                            <img src={selectedImageUrl} style={{ width: '10%', height: 'auto' }} />
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: 'inline-flex', justifyContent: 'center', mt: 2, width: '100%' }}>

                    <Link onClick={openFileSelector} sx={{ color: 'blueviolet', fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '3vw' }} width={'100%'} textAlign={'center'} href="#"><CollectionsIcon fontSize='small' /> {
                        !selectedImageFile ? 'Añadir una imagen' : 'imagen añadida'} </Link>

                    <Link onClick={getGeoLocation} sx={{ color: 'orangered', fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '3vw' }} width={'100%'} textAlign={'center'} href="#"><LocationOnIcon /> Añadir una ubicación </Link>

                </Box>

                <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1 }}>
                    {!postForm.content ?
                        <Button size="small" fullWidth>
                            Publicar
                        </Button> :
                        <Button disabled={loading} sx={{ color: 'white' }} onClick={() => sendRequest(selectedImageFile)} variant="contained" size="small" fullWidth>
                            {!loading ? 'Publicar' : <CircularProgress size={'3vw'} sx={{ color: 'white' }} />}
                        </Button>
                    }
                </Box>

            </Box>
        </Box>
    )
}

PopUpPostingBox.propTypes = {
    token: PropTypes.string,
    handleClosePostingBoxPopUp: PropTypes.func
}