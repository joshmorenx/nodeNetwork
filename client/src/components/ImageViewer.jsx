import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ImageViewer({ image, video, setImgClickedPath }) {
    const [img, setImg] = useState(null)
    const [vid, setVid] = useState(null)

    useEffect(() => {
        setImg(image)
    }, [image])

    useEffect(() => {
        setVid(video)
    }, [video])

    // Bloquear el scroll de la página mientras el visor está abierto
    useEffect(() => {
        if (img || vid) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [img, vid])

    const handleClose = () => {
        setImg(null)
        setVid(null)
        setImgClickedPath(null)
    }

    // Cerrar con la tecla ESC
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
    }, [])

    // Render at document.body level so no parent stacking context can
    // trap the viewer below other overlays; its z-index then competes globally
    return (
        (img || vid) && createPortal(
            <>
                <Box className="feed-image-viewer-backdrop" onClick={handleClose} />
                <Box className="feed-image-viewer">
                    <Box className="feed-image-viewer-close" onClick={handleClose} role="button" aria-label="Cerrar">
                        <CloseIcon />
                    </Box>
                    {vid ? (
                        <video
                            className="feed-image-viewer-img"
                            src={vid}
                            controls
                            autoPlay
                            playsInline
                            alt=""
                        />
                    ) : (
                        <>
                            <img className="feed-image-viewer-img" src={img} alt="" />
                            <a
                                className="feed-image-viewer-open"
                                href={img}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <OpenInNewIcon fontSize="small" />
                                <span>Ver original</span>
                            </a>
                        </>
                    )}
                </Box>
            </>,
            document.body
        )
    )
}

ImageViewer.propTypes = {
    image: PropTypes.string,
    video: PropTypes.string,
    setImgClickedPath: PropTypes.func
}