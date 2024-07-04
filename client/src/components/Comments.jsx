import { Box, Button, Avatar, Typography, Stack } from '@mui/material'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useCommentLikesAndDislikes from '../hooks/useCommentLikesAndDislikes';

export default function Comments({ comment, token }) {
    const [formattedDate, setFormattedDate] = useState('');
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const { getCommentLikesAndDislikes, setCommentLike, setCommentDislike, likes, dislikes, error, success, setSuccess, msg } = useCommentLikesAndDislikes({ comment, token });

    useEffect(() => {
        const date = new Date(comment.date_created);
        const formatted = format(date, 'dd MMMM yyyy', { locale: es });
        setFormattedDate(formatted);
    }, [comment.date_created]);

    useEffect(() => { // se ejecuta unicamente una vez, al montar el componente
        getCommentLikesAndDislikes();
    }, [])

    useEffect(() => {
        if (likes !== undefined) setCurrentLikes(likes);
        if (dislikes !== undefined) setCurrentDislikes(dislikes);
    }, [likes, dislikes])

    useEffect(() => {
        if (success) {
            getCommentLikesAndDislikes();
        }
    }, [success])

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
            <Stack direction="row" sx={{ display: 'flex' }}>
                <Button onClick={setCommentLike}>
                    <ThumbUpIcon /> <span style={{ marginLeft: '5px' }}> Me Gusta ({ currentLikes }) </span>
                </Button>
                <Button onClick={setCommentDislike}>
                    <ThumbDownIcon color="error" /> <span style={{ marginLeft: '5px' }}> No Me Gusta ({ currentDislikes }) </span>
                </Button>
            </Stack>
        </Box>
    )
}