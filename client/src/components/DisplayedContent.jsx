import { useState, useEffect } from "react"
import { Avatar, Button, Stack, Box, Typography } from '@mui/material';

export default function DisplayedContent({ username, following, followers, selectedTab }) {
    return (
        <>
            { selectedTab == 0 && <Typography> Selecciona una pestaña para ver sus contenidos. </Typography> }

            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', gap: '10px' }}>

                {selectedTab == 1 &&
                    <Box sx={{ display: 'block', alignItems: 'center', gap: '10px' }}>
                        <Typography>Seguidores</Typography>
                        {followers.map((follower, key) => (
                            <Box key={key} sx={{ gap: '10px' }}>
                                <Box sx={{ display: 'flex', gap: '50vw', mb: '10px', border: '1px solid black', p: '10px', borderRadius: '10px' }}>
                                    <Box>{follower.username}</Box>
                                    <Button variant="contained">Quitar de seguidores</Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                }

                {selectedTab == 2 &&
                    <Box sx={{ display: 'block', alignItems: 'center', gap: '10px' }}>
                        <Typography>Siguiendo</Typography>
                        {following.map((following, key) => (
                            <Box key={key} sx={{ gap: '10px' }}>
                                <Box sx={{ display: 'flex', gap: '50vw', mb: '10px', border: '1px solid black', p: '10px', borderRadius: '10px' }}>
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