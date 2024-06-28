import { Box, Avatar, Typography } from '@mui/material'
import { useState, useEffect } from 'react';

export default function Comments({ comment }) {

    return (
        <Box sx={{ alignItems: 'center', border: '1px solid grey', margin: '8px', padding: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar>{comment.username.charAt(0).toUpperCase()}</Avatar> 
                <Typography> {comment.username} </Typography>
            </Box>
            <Box sx={{ alignItems: 'center', border: '1px solid grey', margin: '8px', padding: '8px' }}>
                <Typography variant="body2"> {comment.content} </Typography>
            </Box>
        </Box>
    )
}