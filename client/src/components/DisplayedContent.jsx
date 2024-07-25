import { useState, useEffect } from "react"
import { Avatar, Button, Stack, Box, Typography } from '@mui/material';

export default function DisplayedContent({ username, following, followers, selectedTab }) {
    return (
        <>
            <Typography> Selecciona una pestaña para ver sus contenidos. </Typography>

            <Box sx={{ display: 'flex', gap: '10px' }}>

                {selectedTab == 1 &&
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
                }

                {selectedTab == 2 &&
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
                }

            </Box>
        </>
    )
}