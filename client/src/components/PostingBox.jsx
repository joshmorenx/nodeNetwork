import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import PopUpPostingBox from './PopUpPostingBox.jsx'

export default function PostingBox({ token, handleFeedReload }) {
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
                {showPostingBox && <PopUpPostingBox token={token} handleClosePostingBoxPopUp={handleClosePostingBoxPopUp} handleFeedReload={handleFeedReload} />}
                
                <Box sx={{ margin : '20px', display: 'flex'}}>
                    <TextField
                    size="small"
                    placeholder="Escribe lo que piensas..."
                    sx={{ width: '100%' }}
                    onClick={handleOpenPostingBoxPopUp}
                    inputProps={{ readOnly : true }}
                    />
                </Box>
            </>
        )
    )
}

PostingBox.propTypes = {
    token: PropTypes.string
}