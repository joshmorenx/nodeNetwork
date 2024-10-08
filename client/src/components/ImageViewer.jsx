import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ImageViewer({ image, setImgClickedPath }) {
    const [img, setImg] = useState(null)
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');
    const className = useSelector((state) => state.className);

    useEffect(() => {
        setImg(image)
    }, [image])

    const handleClose = () => {
        setImg(null)
        setImgClickedPath(null)
    }

    //addeventlistener to ESC key to onClick={handleClose}
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
    }, [])

    return (
        (img ?
            (<>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1000,
                        bgcolor: '#00000099'
                    }}
                    onClick={handleClose}
                >
                </Box>

                <Box
                    className={className}
                    sx={{
                        width: isDesktop ? '35rem' : isTablet ? '60%' : '95%',
                        borderRadius: '5px',
                        padding: '2%',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1001
                    }}
                >

                    <Link
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: '100%',
                            cursor: 'pointer',
                            zIndex: 102
                        }} href="#">
                        <CloseIcon color='error' />
                    </Link>

                    <img
                        src={img}
                        alt=""
                        style={{
                            width: '100%'
                        }}
                    />
                </Box>
            </>)
            : null)
    )
}

// not really needed but just because proptypes is telling me to put this

ImageViewer.propTypes = {
    image: PropTypes.string,
    setImgClickedPath: PropTypes.func
}