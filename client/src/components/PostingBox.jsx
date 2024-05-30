import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import PopUpPostingBox from './PopUpPostingBox.jsx'

export default function PostingBox({ token }) {
    const [showPostingBox, setShowPostingBox] = useState(false);

    const handleOpenPostingBoxPopUp = () => {
        setShowPostingBox(true)
    }

    const handleClosePostingBoxPopUp = () => {
        setShowPostingBox(false)
    }

    return (
        (token && 
            <>  
                {showPostingBox && <PopUpPostingBox token={token} handleClosePostingBoxPopUp={handleClosePostingBoxPopUp} />}
                
                <Box sx={{ margin : '20px', display: 'flex'}}>
                    <TextField
                    aria-readonly
                    size="small"
                    label="Publica algo..."
                    sx={{ width: '100%' }}
                    onClick={handleOpenPostingBoxPopUp}
                    />
                </Box>
            </>
        )
    )
}

PostingBox.propTypes = {
    token: PropTypes.string
}