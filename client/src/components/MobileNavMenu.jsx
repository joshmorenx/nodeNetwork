import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, Link, Switch } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import FeedIcon from '@mui/icons-material/Feed'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import SettingsIcon from '@mui/icons-material/Settings'
import ThreePIcon from '@mui/icons-material/ThreeP'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LogoutIcon from '@mui/icons-material/Logout'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { setClassName } from '../redux/actions'
import Search from './Search'
import useLogout from '../hooks/useLogout'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import usePermissions from '../hooks/usePermissions'
import useHandleTheme from '../hooks/useHandleTheme'
import Notifications from './Notifications'

export default function MobileNavMenu({ token, handleInputChange, encodedQuery, isSettingsRoute, setSelectedSection }) {
    const { newTheme, updateHandleTheme, getUserTheme } = useHandleTheme({ token })
    const dispatch = useDispatch()
    const [menuState, setMenuState] = useState('closed') // 'closed', 'opening', 'open', 'closing'
    const { logout } = useLogout(token)
    const { user } = useGetCurrentUser({ token })
    const { allAccess } = usePermissions(user)
    const className = useSelector((state) => state.className)

    const linkStyles = {
        color: className === 'bgx-black' ? 'white' : 'black',
        textDecoration: 'none',
        display: 'flex',
        gap: '1vw',
        alignItems: 'center',
    }

    const handleLogout = () => {
        logout()
        closeMenu()
    }

    const handleSectionClick = (section) => {
        setSelectedSection(section)
        closeMenu()
    }

    const handleThemeChange = (event) => {
        updateHandleTheme(event.target.checked)
        handleClassChange(event.target.checked)
    }

    const handleClassChange = (checked) => {
        dispatch(setClassName(checked ? 'bgx-black' : 'bgx-white'))
    }

    const openMenu = () => {
        setMenuState('opening')
        setTimeout(() => setMenuState('open'), 10) // Trigger animation
    }

    const closeMenu = () => {
        setMenuState('closing')
        setTimeout(() => setMenuState('closed'), 300) // Match transition duration
    }

    useEffect(() => {
        getUserTheme()
        handleClassChange(newTheme === 'dark')
        document.body.style.backgroundColor = newTheme === 'dark' ? 'black' : 'white'
    }, [newTheme])

    return (
        <>
            <Button onClick={openMenu} sx={{ height: '7vh' }}>
                <MenuIcon sx={{ color: className === 'bgx-black' ? 'white' : 'black' }} />
            </Button>

            <Box sx={{ alignContent: 'center' }}>
                <Notifications token={token} newTheme={newTheme} />
            </Box>

            <Box
                className={`mobileBarStyles ${className}`}
                sx={{
                    visibility: menuState === 'closed' ? 'hidden' : 'visible',
                    transform: menuState === 'open' || menuState === 'opening' ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1000,
                    backgroundColor: className === 'bgx-black' ? 'black' : 'white',
                }}
            >
                <Box>
                    <Button onClick={closeMenu} sx={{ height: '10vh', ml: '2vw' }}>
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
                                <Typography><Link sx={linkStyles} onClick={closeMenu} href="/"><FeedIcon /> Feed </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={closeMenu} href="/profile"><AccountBoxIcon /> Mi perfil </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={closeMenu} href="/dashboard"><SettingsIcon /> Ajustes </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={closeMenu} href={`/follows/${user.username}#followers`}><ThreePIcon /> Seguidores </Link></Typography>
                            </li>
                            <li>
                                <Typography><Link sx={linkStyles} onClick={closeMenu} href={`/follows/${user.username}#following`}><HowToRegIcon /> Siguiendo </Link></Typography>
                            </li>
                            <li>
                                <Typography sx={linkStyles}><DarkModeIcon /> Modo oscuro
                                    <Switch onChange={handleThemeChange} checked={newTheme === 'dark'} />
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
                                <Typography><Link sx={linkStyles} onClick={closeMenu} href="/"><FeedIcon /> Feed </Link></Typography>
                            </li>
                            {(allAccess || user.userId === 1) && (
                                <li>
                                    <Typography><Link sx={linkStyles} onClick={() => handleSectionClick('assign')} href="#"><AccountBoxIcon /> Asignador de permisos </Link></Typography>
                                </li>
                            )}
                            <li>
                                <Typography><Link sx={linkStyles} onClick={() => handleSectionClick('profile_settings')} href="#"><SettingsIcon /> Ajustes de perfil </Link></Typography>
                            </li>
                            <li>
                                <Typography sx={linkStyles}><DarkModeIcon /> Modo oscuro
                                    <Switch onChange={handleThemeChange} checked={newTheme === 'dark'} />
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