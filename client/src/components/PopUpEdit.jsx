import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import useUpdatePost from '../hooks/useUpdatePost.jsx';
import { useMediaQuery } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export default function PopUpEdit({ token, post, setUpdatePost, type }) {
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

                {/* <Box sx={{ display: 'inline-flex', justifyContent: 'center', mt: 2, width: '100%' }}>
                    <Link sx={{ color: 'blueviolet', fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '3vw' }} width={'100%'} textAlign={'center'} href="#"><CollectionsIcon fontSize='small' /> Añadir una imagen/video</Link>
                    <Link sx={{ color: 'orangered', fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '3vw' }} width={'100%'} textAlign={'center'} href="#"><LocationOnIcon /> Añadir una ubicación</Link>
                </Box> */}

                <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1 }}>
                    {!postForm.content ?
                        <Button size="small" fullWidth>
                            Actualizar
                        </Button> :
                        <Button disabled={loading} sx={{ color: 'white' }} onClick={() => updatePost()} variant="contained" size="small" fullWidth>
                            {!loading ? 'Actualizar' : <CircularProgress size={'3vw'} sx={{ color: 'white' }} />}
                        </Button>
                    }
                </Box>

            </Box>
        </Box>
    )
}