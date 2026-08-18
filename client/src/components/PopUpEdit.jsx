import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import useUpdatePost from '../hooks/useUpdatePost.jsx';
import { useMediaQuery } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export default function PopUpEdit({ token, post, setUpdatePost, type }) {
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const className = useSelector((state) => state.className);
    const { postForm, msg, error, success, setSuccess, handleInputChange, updatePost, updatedPost, setUpdatedPost, loading } = useUpdatePost({
        token, initialForm: {
            id: type === 'post' ? post.postId : post.commentId,
            content: post.content,
            latitude: post.latitude,
            longitude: post.longitude,
            images: post.images,
            date_updated: post.date_updated
        }, type
    })

    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

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

    useEffect(() => {
        if (success) {
            post.content = updatedPost.content;
            setUpdatePost(false);
        }
    }, [success])

    const openVideoSelector = () => {
        document.getElementById('edit-videofile').click()
    }

    const handleVideoChange = (event) => {
        setSelectedVideoFile(event.target.files[0])
        setSelectedVideoUrl(URL.createObjectURL(event.target.files[0]))
    }

    const clearVideoInput = () => {
        document.getElementById('edit-videofile').value = null
        setSelectedVideoFile(null)
        setSelectedVideoUrl(null)
    }

    return (
        <Box className="posting-box-popup">
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1001, bgcolor: '#00000099' }} onClick={() => setUpdatePost(false)}></Box>
            <Box className={className} sx={popUpEditStyles}>

                <Box sx={{ border: '1px 1px 0 0 solid black', mb: '2%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant={isDesktop ? 'h4' : isTablet ? 'h6' : 'h7'} sx={{ fontWeight: 'bold' }} align='center' >Actualizar publicación</Typography>
                </Box>

                <Box sx={{ mr: 0, mb: 0, ml: 0 }}>
                    <TextField
                        className="bgx-white"
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
                    />
                </Box>
                <Box sx={{ display: 'none', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <TextField
                        type='number'
                        name="latitude"
                        id="latitude"
                        label="Latitud"
                    // onChange={handleInputChange}
                    // value={postForm.latitude}
                    />

                    <TextField
                        type='number'
                        name="longitude"
                        id="longitude"
                        label="Longitud"
                    // onChange={handleInputChange}
                    // value={postForm.longitude}
                    />
                </Box>

                {type === 'post' && (
                    <Box sx={{ mt: 2 }}>
                        <input style={{ display: 'none' }} id='edit-videofile' type='file' onChange={handleVideoChange} accept=".mp4, .webm, .mov, .m4v, .ogg" />

                        {selectedVideoUrl && (
                            <Box className="feed-post-form-preview">
                                <CloseIcon onClick={clearVideoInput} />
                                <video controls src={selectedVideoUrl} style={{ display: 'block', width: '100%', maxHeight: 280, borderRadius: 14, background: '#000' }} />
                            </Box>
                        )}

                        <Button className="feed-post-form-action" onClick={openVideoSelector} sx={{ width: '100%' }}>
                            <VideoFileIcon /> {selectedVideoFile ? 'Video nuevo añadido ✓' : (post.videos && post.videos.length > 0 ? 'Reemplazar video actual' : 'Añadir un video')}
                        </Button>
                    </Box>
                )}

                <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1 }}>
                    {!postForm.content ?
                        <Button size="small" fullWidth>
                            Actualizar
                        </Button> :
                        <Button disabled={loading} sx={{ color: 'white' }} onClick={() => updatePost(undefined, selectedVideoFile)} variant="contained" size="small" fullWidth>
                            {!loading ? 'Actualizar' : <CircularProgress size={'3vw'} sx={{ color: 'white' }} />}
                        </Button>
                    }
                </Box>

            </Box>
        </Box>
    )
}