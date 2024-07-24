import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Stack, Box, Typography } from '@mui/material';
import useFollowUser from '../hooks/useFollowUser';
import useUnfollowUser from '../hooks/useUnfollowUser';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import useGetFollows from '../hooks/useGetFollows.jsx'

export default function FollowContent({ token, username }) {
    const { user, error } = useGetCurrentUser({ token });
    const { messageFollows, successFollows, errorFollows, followers, following, getFollows } = useGetFollows({ token })

    useEffect(() => {
        if (username) {
            getFollows(username) //needs a rework
        }
    }, [username])

    return (
        <Box sx={{ width: '100%' }}>
            <Typography>We are working on this section. Please come back later {username ? username : ''}</Typography>

            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box sx={{ display: 'block', alignItems: 'center', gap: '10px', border: '1px solid black' }}>
                    <Typography>Siguiendo</Typography>
                    {following.map((following, key) => (
                        <Box key={key} sx={{ gap: '10px' }}>
                            <Box sx={{ display: 'flex', gap: '10px', mb: '10px' }}>
                                <Box>{following.username}</Box>
                                <Button variant="contained">Quitar de seguidores</Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'block', alignItems: 'center', gap: '10px', border: '1px solid black' }}>
                    <Typography>Seguidores</Typography>
                    {followers.map((follower, key) => (
                        <Box key={key} sx={{ gap: '10px' }}>
                            <Box sx={{ display: 'flex', gap: '10px', mb: '10px' }}>
                                <Box>{follower.username}</Box>
                                <Button variant="contained">Quitar de seguidores</Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}