import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Stack, Box, Typography } from '@mui/material';
import useFollowUser from '../hooks/useFollowUser';
import useUnfollowUser from '../hooks/useUnfollowUser';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import useGetFollows from '../hooks/useGetFollows.jsx'

export default function FollowContent({ token, username }) {
    const { user, error } = useGetCurrentUser({ token });
    const {messageFollows, successFollows, errorFollows, getFollows} = useGetFollows({ token })

    useEffect(()=>{
        getFollows(username)
    },[])
    
    return (
        <Box sx={{ width: '100%' }}>
            <Typography>We are working on this section. Please come back later {user.username ? user.username : ''}</Typography>
            <Box>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '100%' }} className="follows">
                    <Box>
                        <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }} >
                            <Avatar>H</Avatar>
                            <span>{username}</span>
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained">Seguir</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}