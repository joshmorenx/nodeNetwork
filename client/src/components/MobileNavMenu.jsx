import { Box, Button, MenuList, Typography, MenuItem, Link } from '@mui/material'
import { useState, useEffect } from 'react'
import Search from './Search.jsx'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useLogout from '../hooks/useLogout'
import useGetCurrentUser from '../hooks/useGetCurrentUser.jsx';

export default function MobileNavMenu({ token, handleInputChange, encodedQuery }) {
    const [open, setOpen] = useState(false)
    const { logout } = useLogout(token);
    const { user } = useGetCurrentUser({ token });

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
                    <Button onClick={() => setOpen(!open)} sx={{ height: '15vh', ml: '2.5vw' }}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Button>
                </Box>
                <Box sx={{ pl: '8vw' }}>
                    <ol className="mobile-menu-list">
                        <li>
                            <Search handleInputChange={handleInputChange} encodedQuery={encodedQuery} />
                        </li>
                        <li>
                            <Typography><Link onClick={() => setOpen(!open)} href="/">Feed</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link onClick={() => setOpen(!open)} href="/profile">Profile</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link onClick={handleLogout}>Logout</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link onClick={() => setOpen(!open)} href="/dashboard">Settings</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link onClick={() => setOpen(!open)} href={`/follows/${user.username}#followers`}>Followers</Link></Typography>
                        </li>
                        <li>
                            <Typography><Link onClick={() => setOpen(!open)} href={`/follows/${user.username}#following`}>Following</Link></Typography>
                        </li>
                    </ol>
                </Box>
            </Box>
        </>
    )
}