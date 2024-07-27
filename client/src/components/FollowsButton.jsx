import { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import useFollowUser from '../hooks/useFollowUser';
import useUnfollowUser from '../hooks/useUnfollowUser';

export default function FollowsButton({ token, username }) {
    const { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess } = useFollowUser({ token, username });
    const { sendUnfollowRequest, er, msj, suc } = useUnfollowUser({ token, username });

    useEffect(() => {
        checkFollowAlreadyExists();
    }, [])

    return(
        <>
            <Button
                variant="contained"
            >
                {isFollowing ? 'Siguiendo' : 'Seguir'}
            </Button>
        </>
    )
}