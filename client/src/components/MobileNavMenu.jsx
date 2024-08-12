import { Box, Button, MenuList, Typography, MenuItem, Link } from '@mui/material'
import { useState, useEffect } from 'react'
import Search from './Search.jsx'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useLogout from '../hooks/useLogout'
import useGetCurrentUser from '../hooks/useGetCurrentUser.jsx';
import FeedIcon from '@mui/icons-material/Feed';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MobileNavMenu({ token, handleInputChange, encodedQuery }) {
    const [open, setOpen] = useState(false)
    const { logout } = useLogout(token);
    const { user } = useGetCurrentUser({ token });

    const linkStyles = {
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        gap: '1vw',
    }

    const handleLogout = () => {
        logout();
        setOpen(!open)
    }

    return (
        <>
            <Button onClick={() => setOpen(!open)} sx={{ height: '7vh' }}>
                <MenuIcon sx={{ color: 'white' }} />
            </Button>
            <Box className='bgx-black' visibility={open ? 'visible' : 'hidden'} sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: 1000 }}>
                <Box>
                    <Button onClick={() => setOpen(!open)} sx={{ height: '10vh', ml: '2vw' }}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Button>
                </Box>
                <Box sx={{ pl: '8vw' }}>
                    <ol className="mobile-menu-list">
                        <li>
                            <Search handleInputChange={handleInputChange} encodedQuery={encodedQuery} />
                        </li>
                        <li>
                            <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/"><FeedIcon /> Feed</Link></Typography>
                            
                        </li>
                        <li>
                            <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/profile"><AccountBoxIcon /> Profile</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/dashboard"><SettingsIcon /> Settings</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href={`/follows/${user.username}#followers`}><ThreePIcon /> Followers</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href={`/follows/${user.username}#following`}><HowToRegIcon /> Following</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link sx={linkStyles} onClick={handleLogout}><LogoutIcon /> Logout</Link></Typography>
                        </li>
                    </ol>
                </Box>
            </Box>
        </>
    )
}