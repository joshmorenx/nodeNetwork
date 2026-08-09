import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import { Box, Button, IconButton, TextField, Typography, Avatar } from "@mui/material";
import useCreateNewPost from '../hooks/useCreateNewPost.jsx';
import useGetCurrentUser from '../hooks/useGetCurrentUser.jsx';
import useGetProfileImage from '../hooks/useGetProfileImage';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const EMOJI_QUICK_PICKS = ['😀', '😂', '😍', '🔥', '👍', '🎉', '❤️', '😎', '🙌', '💯'];

const HASHTAG_SUGGESTIONS = ['#programacion', '#react', '#node', '#javascript', '#web', '#musica', '#deporte', '#gaming'];

export default function PopUpPostingBox({ token, handleClosePostingBoxPopUp, handleFeedReload }) {
    const [selectedImageFile, setSelectedImageFile] = useState(null); // Default image file
    const [selectedImageUrl, setSelectedImageUrl] = useState(null); // Default image URL
    const { sendRequest, success, handleInputChange, postForm, loading } = useCreateNewPost({
        token, initialForm: {
            content: '',
            latitude: '',
            longitude: '',
            image: null
        }
    })
    const { user } = useGetCurrentUser({ token });
    const { image } = useGetProfileImage({ id: user.username });
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');

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

    const appendToContent = (text) => {
        const current = postForm.content || '';
        const separator = current.length > 0 && !current.endsWith(' ') ? ' ' : '';
        handleInputChange({ target: { name: 'content', value: current + separator + text } });
    }

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === 'Escape') {
                handleClosePostingBoxPopUp()
            }
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && postForm.content && !loading) {
                sendRequest(selectedImageFile)
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [handleClosePostingBoxPopUp, postForm.content, loading, selectedImageFile, sendRequest])

    useEffect(() => {
        if (success) {
            handleClosePostingBoxPopUp()
            handleFeedReload()
        }
    }, [success, handleClosePostingBoxPopUp, handleFeedReload])


    return (
        <Box className="posting-box-popup">
            <Box className="composer-backdrop" onClick={handleClosePostingBoxPopUp}></Box>
            <Box className={`composer-modal ${className}`}>

                <Box className="composer-header">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Avatar className="feed-avatar" src={image}>
                            {user.username ? user.username.charAt(0).toUpperCase() : ''}
                        </Avatar>
                        <Box>
                            <Typography className="composer-title">Crear una publicación</Typography>
                            {user.username && <Typography className="composer-subtitle">Publicando como @{user.username}</Typography>}
                        </Box>
                    </Box>
                    <IconButton
                        aria-label="Cerrar"
                        className="composer-close-btn"
                        onClick={handleClosePostingBoxPopUp}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box className="composer-body">
                    <TextField
                        className={`composer-textarea ${className}`}
                        multiline
                        variant="outlined"
                        size="medium"
                        placeholder="¿Qué está pasando? Escribe y usa #hashtags..."
                        sx={{ width: '100%' }}
                        rows={isDesktop ? 7 : 6}
                        onChange={handleInputChange}
                        value={postForm.content}
                        id="content"
                        name="content"
                        inputProps={{ autoFocus: true, maxLength: 500 }}
                        required
                    />
                    <Box className="composer-counter">{postForm.content ? postForm.content.length : 0}/500</Box>

                    <Box className="composer-emoji-row">
                        {EMOJI_QUICK_PICKS.map(emoji => (
                            <Button key={emoji} className="composer-emoji-btn" onClick={() => appendToContent(emoji)} aria-label={`Insertar ${emoji}`}>
                                {emoji}
                            </Button>
                        ))}
                    </Box>

                    <Box className="composer-hashtags">
                        <Box className="composer-hashtag-title">
                            <TagIcon fontSize="small" />
                            <Typography>Hashtags populares</Typography>
                        </Box>
                        <Box className="composer-hashtag-chips">
                            {HASHTAG_SUGGESTIONS.map(tag => (
                                <Button key={tag} className={`composer-hashtag-chip ${className}`} onClick={() => appendToContent(tag)}>
                                    {tag}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Box>
                        <input style={{ display: 'none' }} id='imagefile' type='file' onChange={handleImageChange} accept=".jpg, .jpeg, .png, .jfif, .raw" />
                        {selectedImageUrl && (
                            <Box className="composer-preview">
                                <img src={selectedImageUrl} alt="Vista previa" />
                                <Box className="composer-preview-name">
                                    {selectedImageFile ? selectedImageFile.name : 'Imagen adjunta'}
                                </Box>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    className="composer-preview-remove"
                                    onClick={clearInput}
                                >
                                    Quitar
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Box className="composer-actions">
                        <Button className="composer-action-btn" onClick={openFileSelector} startIcon={<CollectionsIcon />}>
                            {!selectedImageFile ? 'Añadir una imagen' : 'Cambiar imagen'}
                        </Button>

                        <Button className="composer-action-btn" onClick={getGeoLocation} startIcon={<LocationOnIcon />}>
                            Añadir una ubicación
                        </Button>
                    </Box>

                    <Button
                        className="composer-publish"
                        disabled={!postForm.content || loading}
                        onClick={() => sendRequest(selectedImageFile)}
                        variant="contained"
                    >
                        {!loading ? 'Publicar' : <CircularProgress size={22} sx={{ color: 'white' }} />}
                    </Button>

                    <Box className="composer-hint">
                        Consejo: pulsa <strong>Ctrl + Enter</strong> para publicar más rápido
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

PopUpPostingBox.propTypes = {
    token: PropTypes.string,
    handleClosePostingBoxPopUp: PropTypes.func,
    handleFeedReload: PropTypes.func
}
