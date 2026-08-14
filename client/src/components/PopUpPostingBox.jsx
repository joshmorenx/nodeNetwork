import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, TextField, Typography } from "@mui/material";
import useCreateNewPost from '../hooks/useCreateNewPost.jsx';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

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
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

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
            <Box className={`feed-post-form ${className}`}>

                <Box className="feed-post-form-header">
                    <Typography className="feed-post-form-title" align='center' >Crear una publicación</Typography>
                    <CloseIcon className="feed-post-form-close" onClick={handleClosePostingBoxPopUp} />
                </Box>

                <TextField
                    className='bgx-white'
                    multiline
                    variant="outlined"
                    size="small"
                    label="Escribe lo que piensas..."
                    sx={{ width: '100%' }}
                    rows={isDesktop ? 9 : isTablet ? 8 : 5}
                    onChange={handleInputChange}
                    value={postForm.content}
                    id="content"
                    name="content"
                    inputProps={{ autoFocus: true }}
                    required
                />

                <Box className="feed-post-form-count-wrap">
                    <Typography className="feed-post-form-count">
                        {postForm.content.length} caracteres
                    </Typography>
                    {!postForm.content && <Typography className="feed-post-form-hint">Escribe algo para publicar...</Typography>}
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
                        <Box className="feed-post-form-preview">
                            <CloseIcon onClick={clearInput} />
                            <img src={selectedImageUrl} alt="vista previa de la imagen" />
                        </Box>
                    )}
                </Box>

                <Box className="feed-post-form-actions">

                    <Button className="feed-post-form-action" onClick={openFileSelector}>
                        <CollectionsIcon /> {!selectedImageFile ? 'Añadir una imagen' : 'Imagen añadida ✓'}
                    </Button>

                    <Button className="feed-post-form-action feed-post-form-action-location" onClick={getGeoLocation}>
                        <LocationOnIcon /> Añadir una ubicación
                    </Button>

                </Box>

                {error && <Typography className="feed-post-form-error">No se pudo publicar, inténtalo de nuevo.</Typography>}

                <Box className="feed-post-form-submit">
                    {!postForm.content ?
                        <Button size="small" fullWidth className="feed-post-form-submit-btn">
                            Publicar
                        </Button> :
                        <Button disabled={loading} onClick={() => sendRequest(selectedImageFile)} variant="contained" size="small" fullWidth className="feed-post-form-submit-btn">
                            {!loading ? 'Publicar' : <CircularProgress size={'2rem'} sx={{ color: 'white' }} />}
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