import CloseIcon from '@mui/icons-material/Close';
import { Box, Link } from '@mui/material';
import { useState } from 'react';

export default function ImageViewer({ image }){
    const [img, setImg] = useState(null)

    useEffect(() => {
        setImg(image)
    }, [image])

    const handleClose = () => {
        setImg(null)
    }

    return (
        (img ?
            (<Box sx={{ borderRadius: '5px', padding: '2%', bgcolor: '#ffc3008c', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Link onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0, bottom: 100, cursor: 'pointer' }} href="#"><CloseIcon/></Link>
                <img src={img} alt="" />
            </Box>)
        : null)
    )
}