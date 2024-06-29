import { Box, Avatar, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Comments({ comment }) {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const date = new Date(comment.date_created);
        const formatted = format(date, 'dd MMMM yyyy', { locale: es });
        setFormattedDate(formatted);
    }, [comment.date_created]);

    return (
        <Box sx={{ alignItems: 'center', border: '1px solid grey', margin: '8px', padding: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar>{comment.username.charAt(0).toUpperCase()}</Avatar> 
                <Typography> {comment.username} </Typography>
                <Typography sx={{ ml: '10px', border: '1px solid grey', padding: '5px', color: 'white', bgcolor: 'black' }}> creado el {formattedDate} </Typography>
            </Box>
            <Box sx={{ alignItems: 'center', border: '1px solid grey', margin: '8px', padding: '8px' }}>
                <Typography variant="body2"> {comment.content} </Typography>
            </Box>
        </Box>
    )
}