import PropTypes from 'prop-types';
import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Autocomplete, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Search from './Search.jsx';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../hooks/useLogout'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import MobileNavMenu from './MobileNavMenu.jsx';

export default function Navbar({ token }) {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const { user } = useGetCurrentUser({ token });

    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const gotoDashboard = () => {
        navigate('/dashboard')
    }

    const gotoFeed = () => {
        navigate('/feed')
    }

    const { logout } = useLogout(token);

    const handleLogout = () => {
        logout();
    }

    const handleInputChange = (event) => {
        const { value } = event.target
        setQuery(value)
    }

    const encodedQuery = encodeURIComponent(query)

    // const carBrandOptions = ['ford','kia','mercedes','bmw','audi','volkswagen','porsche']

    return (
        <Box sx={{ mb: 9 }}>
            <Box className="bgx-black" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                {/* we'll build a nav bar with search bar in the middle and a button to go to dashboard and a notification button and a messages button in the right */}
                <Box p={1} sx={isTablet ? { display: 'flex', justifyContent: 'center' } : { display: 'flex', justifyContent: 'space-between' }}>
                    {/* config section */}
                    {isDesktop || isTablet ?
                        <>
                            <Box className="config-section">
                                <Button onClick={gotoDashboard} variant="text" color="primary">
                                    <SettingsIcon sx={{ color: 'white' }}></SettingsIcon>
                                </Button>
                            </Box>

                            <Search handleInputChange={handleInputChange} encodedQuery={encodedQuery} />

                            <Box sx={{ display: 'flex', alignItems: 'center' }} className="notification-section">
                                <Button onClick={handleLogout}>
                                    <LogoutIcon sx={{ color: 'white' }} />
                                </Button>
                                <Button onClick={gotoFeed}>
                                    <HomeIcon sx={{ color: 'white' }} />
                                </Button>
                                {/* <Button>
                            <MessageIcon sx={{ color: 'white' }}></MessageIcon> // pending
                        </Button> */}
                                {/* <Button onClick={ () => alert }>
                            <NotificationsIcon sx={{ color: 'white' }}></NotificationsIcon> // pending
                        </Button> */}
                                <Button>
                                    <Stack direction="row" spacing={2}>
                                        {user.username ? (
                                            <Link to={`/profile/`}><Avatar> {user.username.charAt(0).toUpperCase()} </Avatar></Link>
                                        ) : (<></>)}
                                    </Stack>
                                </Button>
                            </Box>
                        </>
                    :
                        <>
                            <MobileNavMenu token={token} handleInputChange={handleInputChange} encodedQuery={encodedQuery} />
                        </>}
                </Box>
            </Box>
        </Box>
    )
}

Navbar.propTypes = {
    token: PropTypes.string.isRequired
}