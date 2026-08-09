import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, TextField } from "@mui/material";
import { useSelector } from 'react-redux';
import PopUpPostingBox from './PopUpPostingBox.jsx'

export default function PostingBox({ token, handleFeedReload }) {
    const [showPostingBox, setShowPostingBox] = useState(false);
    const className = useSelector((state) => state.className);

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

                <Box className={`feed-composer ${className}`} sx={{ display: 'flex' }}>
                    <TextField
                        size="small"
                        placeholder="Escribe lo que piensas..."
                        sx={{ width: '100%' }}
                        onClick={handleOpenPostingBoxPopUp}
                        inputProps={{ readOnly: true }}
                    />
                </Box>
            </>
        )
    )
}

PostingBox.propTypes = {
    token: PropTypes.string,
    handleFeedReload: PropTypes.func
}