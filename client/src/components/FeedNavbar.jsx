import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Autocomplete, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function FeedNavbar() {
    const navigate = useNavigate()

    const gotoDashboard = () => {
        navigate('/dashboard')
    }

    const carBrandOptions = ['ford','kia','mercedes','bmw','audi','volkswagen','porsche']
        
    return (
        <Box>
            {/* we'll build a nav bar with search bar in the middle and a button to go to dashboard and a notification button and a messages button in the right */}
            <Box bgcolor={'aquamarine'} p={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* config section */}
                <Box className="config-section">
                    <Button onClick={ gotoDashboard } variant="text" color="primary">
                        <SettingsIcon></SettingsIcon>
                    </Button>
                </Box>
                <Box className="search-section">
                    <Autocomplete 
                        disablePortal
                        id="combo-box-demo"
                        options={carBrandOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Search" 
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <SearchIcon style={{ cursor: 'pointer' }} />
                                    ),
                                }}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }} className="notification-section">
                    <Button>
                        <MessageIcon></MessageIcon>
                    </Button>
                    <Button>
                        <NotificationsIcon></NotificationsIcon>
                    </Button>
                    <Button>
                        <Stack direction="row" spacing={2}>
                            <Avatar>H</Avatar>
                        </Stack>              
                    </Button>
                </Box>
            </Box>                    
        </Box>                
    )
}