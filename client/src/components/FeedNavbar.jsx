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
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../hooks/useLogout'
import useGetCurrentUser from '../hooks/useGetCurrentUser'


export default function FeedNavbar({token}) {
    const navigate = useNavigate()
    const { user } = useGetCurrentUser({token});

    const gotoDashboard = () => {
        navigate('/dashboard')
    }

    const { logout } = useLogout(token);

    const handleLogout = () => {
        logout();
    }

    const carBrandOptions = ['ford','kia','mercedes','bmw','audi','volkswagen','porsche']
        
    return (
        <Box sx={{ mb: 9 }}>
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                {/* we'll build a nav bar with search bar in the middle and a button to go to dashboard and a notification button and a messages button in the right */}
                <Box bgcolor={'#7fbfff'} p={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* config section */}
                    <Box className="config-section">
                        <Button onClick={ gotoDashboard } variant="text" color="primary">
                            <SettingsIcon sx={{ color: 'white' }}></SettingsIcon>
                        </Button>
                    </Box>
                    <Box className="search-section">
                        <Autocomplete 
                            disablePortal
                            id="combo-box-demo"
                            options={carBrandOptions}
                            sx={{ width: '50vw' }}
                            renderInput={(params) => (
                                <TextField 
                                    sx={{ bgcolor: 'white' }}
                                    {...params} 
                                    label="Search" 
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <SearchIcon style={{  cursor: 'pointer' }} />
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} className="notification-section">
                        <Button onClick={ handleLogout }>
                            <LogoutIcon sx={{ color: 'white' }} />
                        </Button>
                        <Button>
                            <MessageIcon sx={{ color: 'white' }}></MessageIcon>
                        </Button>
                        <Button>
                            <NotificationsIcon sx={{ color: 'white' }}></NotificationsIcon>
                        </Button>
                        <Button>
                            <Stack direction="row" spacing={2}>
                                { user.username ? (
                                    <Link to={`/profile/`}><Avatar> { user.username.charAt(0).toUpperCase() } </Avatar></Link>
                                ) : (<></>) }
                            </Stack>              
                        </Button>
                    </Box>
                </Box>                    
            </Box>                
        </Box>
    )
}

FeedNavbar.propTypes = {
    token: PropTypes.string.isRequired
}