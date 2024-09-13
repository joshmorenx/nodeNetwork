import { Box, Button, MenuList, Typography, MenuItem, Link } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setClassName } from '../redux/actions';
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
import usePermissions from '../hooks/usePermissions.jsx';
import useHandleTheme from '../hooks/useHandleTheme.jsx/';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Notifications from './Notifications.jsx';

export default function MobileNavMenu({ token, handleInputChange, encodedQuery, isSettingsRoute, setSelectedSection }) {
    const { newTheme, themeMsg, themeSuccess, themeLoading, themeError, updateHandleTheme, getUserTheme } = useHandleTheme({ token })
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const { logout } = useLogout(token);
    const { user } = useGetCurrentUser({ token });
    const { cadena, allAccess } = usePermissions(user)
    const className = useSelector((state) => state.className);

    const linkStyles = {
        color: className === 'bgx-black' ? 'white' : 'black',
        textDecoration: 'none',
        display: 'flex',
        gap: '1vw',
        alignItems: 'center',
    }

    const handleLogout = () => {
        logout();
        setOpen(!open)
    }

    const handleSectionClick = (section) => {
        setSelectedSection(section)
        setOpen(!open)
    }

    const handleThemeChange = (event) => {
        updateHandleTheme(event.target.checked)
        handleClassChange(event.target.checked)
    }

    const handleClassChange = (checked) => {
        dispatch(setClassName(checked ? 'bgx-black' : 'bgx-white'));
    };

    useEffect(() => {
        getUserTheme()
        handleClassChange(newTheme === 'dark' ? true : false)
        document.body.style.backgroundColor = (newTheme === 'dark' ? 'black' : 'white')
    }, [newTheme])

    return (
        <>
            <Button onClick={() => setOpen(!open)} sx={{ height: '7vh' }}>
                <MenuIcon sx={{ color: className === 'bgx-black' ? 'white' : 'black' }} />
            </Button>

            <Box sx={{ alignContent: 'center' }}>
                <Notifications token={token} newTheme={newTheme} />
            </Box>
            
            <Box className={className} visibility={open ? 'visible' : 'hidden'} sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: 1000 }}>
                <Box>
                    <Button onClick={() => setOpen(!open)} sx={{ height: '10vh', ml: '2vw' }}>
                        <CloseIcon sx={{ color: className === 'bgx-black' ? 'white' : 'black' }} />
                    </Button>
                </Box>
                {!isSettingsRoute ? (
                    <Box sx={{ pl: '8vw' }}>
                        <ol className="mobile-menu-list">
                            <li>
                                <Search handleInputChange={handleInputChange} encodedQuery={encodedQuery} />
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/"><FeedIcon /> Feed </Link></Typography>

                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/profile"><AccountBoxIcon /> Mi perfil </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/dashboard"><SettingsIcon /> Ajustes </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href={`/follows/${user.username}#followers`}><ThreePIcon /> Seguidores </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href={`/follows/${user.username}#following`}><HowToRegIcon /> Siguiendo </Link></Typography>
                            </li>
                            <li>
                                <Typography sx={linkStyles}><DarkModeIcon /> Modo oscuro
                                    <Switch onChange={handleThemeChange} checked={newTheme === 'dark' ? true : false} />
                                </Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={handleLogout}><LogoutIcon /> Cerrar sesión </Link></Typography>
                            </li>
                        </ol>
                    </Box>
                ) : (
                    <Box sx={{ pl: '8vw' }}>
                        <ol className="mobile-menu-list">
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => setOpen(!open)} href="/"><FeedIcon /> Feed </Link></Typography>
                            </li>
                            {allAccess && <li>
                                <Typography><Link sx={linkStyles} onClick={() => handleSectionClick('assign')} href="#"><AccountBoxIcon /> Asignador de permisos </Link></Typography>
                            </li>}
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => handleSectionClick('profile_settings')} href="#"><SettingsIcon /> Ajustes de perfil </Link></Typography>
                            </li>
                            <li>
                                <Typography sx={linkStyles}><DarkModeIcon /> Modo oscuro
                                    <Switch onChange={handleThemeChange} checked={newTheme === 'dark' ? true : false} />
                                </Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={handleLogout}><LogoutIcon /> Cerrar sesión </Link></Typography>
                            </li>
                        </ol>
                    </Box>
                )}
            </Box>
        </>
    )
}