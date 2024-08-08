import PropTypes from 'prop-types'
import { Box, Button, Avatar, Typography, Stack } from '@mui/material'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useCommentLikesAndDislikes from '../hooks/useCommentLikesAndDislikes';
import { useMediaQuery } from '@mui/material';

export default function Comments({ comment, token }) {
    const [formattedDate, setFormattedDate] = useState('');
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const { getCommentLikesAndDislikes, setCommentLike, setCommentDislike, likes, dislikes, error, success, setSuccess, msg } = useCommentLikesAndDislikes({ comment, token });

    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');


    const reactionIconStyles = {
        fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '5vw'        
    }

    const reactionTextStyles = {
        fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '2.5vw',
        marginLeft: '5px'
    }

    const avatarStyles = {
        width: isDesktop ? '50px' : isTablet ? '50px' : '30px',
        height: isDesktop ? '50px' : isTablet ? '50px' : '30px'
    }

    const userNameStyles = {
        fontSize: isDesktop ? '20px' : isTablet ? '20px' : '12px'
    }
    
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
                <Avatar sx={avatarStyles}>{comment.username.charAt(0).toUpperCase()}</Avatar>
                <Typography sx={userNameStyles}> {comment.username} </Typography>
                <Typography style={reactionTextStyles} sx={{ ml: '10px', border: '1px solid grey', padding: '5px', color: 'white', bgcolor: 'black' }}> creado el {formattedDate} </Typography>
            </Box>
            <Box sx={{ alignItems: 'center', border: '1px solid grey', margin: '8px', padding: '8px' }}>
                <Typography variant="body2"> {comment.content} </Typography>
            </Box>
            <Stack direction="row" sx={{ display: 'flex' }}>
                <Button onClick={setCommentLike}>
                    <ThumbUpIcon sx={reactionIconStyles} /> <span style={reactionTextStyles}> Me Gusta ({ currentLikes }) </span>
                </Button>
                <Button onClick={setCommentDislike}>
                    <ThumbDownIcon sx={reactionIconStyles} color="error" /> <span style={reactionTextStyles}> No Me Gusta ({ currentDislikes }) </span>
                </Button>
            </Stack>
        </Box>
    )
}

PropTypes.propTypes = {
    comment: PropTypes.object,
    token: PropTypes.string
}