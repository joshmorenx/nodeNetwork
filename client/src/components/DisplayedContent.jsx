import { useState, useEffect } from "react"
import { Avatar, Button, Stack, Box, Typography, Link } from '@mui/material';
import FollowsButton from './FollowsButton.jsx';
import { useMediaQuery } from '@mui/material';

export default function DisplayedContent({ token, username, following, followers, selectedTab }) {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    return (
        <>
            {selectedTab == 0 && <Typography> Selecciona una pestaña para ver sus contenidos. </Typography>}

            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', gap: '10px' }}>

                {selectedTab == 1 &&
                    <Box sx={{ display: 'block', alignItems: 'center', gap: '10px' }}>
                        <Typography>Seguidores</Typography>
                        {followers.map((follower, key) => (
                            <Box className="bgx-black" key={key} sx={{ gap: '10px' }}>
                                <Box sx={{ display: 'inline-flex', gap: isDesktop ? '50vw' : isTablet ? '40vw' : '25vw', mb: '10px', border: '1px solid black', p: '10px', borderRadius: '10px' }}>
                                    <Link href={`/profile/${follower.username}`} style={{ textDecoration: 'none', cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}> {follower.username} </Link>
                                    <Button size="small" sx={{ bgcolor: 'gray', marginLeft: 'auto' }} variant="disabled">
                                        Seguidor
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                }

                {selectedTab == 2 &&
                    <Box sx={{ display: 'block', alignItems: 'center', gap: '10px' }}>
                        <Typography>Siguiendo</Typography>
                        {following.map((following, key) => (
                            <Box className="bgx-black" key={key} sx={{ gap: '10px' }}>
                                <Box sx={{ display: 'flex', gap: isDesktop ? '50vw' : isTablet ? '40vw' : '25vw', mb: '10px', border: '1px solid black', p: '10px', borderRadius: '10px' }}>
                                    <Link href={`/profile/${following.username}`} style={{ textDecoration: 'none', cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}> {following.username} </Link>
                                    <Box sx={{ marginLeft: 'auto' }}>
                                        <FollowsButton token={token} username={following.username} />
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                }

            </Box>
        </>
    )
}