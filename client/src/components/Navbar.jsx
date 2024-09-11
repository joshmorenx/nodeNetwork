import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setClassName } from '../redux/actions';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Search from './Search.jsx';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../hooks/useLogout'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import HomeIcon from '@mui/icons-material/Home';
import MobileNavMenu from './MobileNavMenu.jsx';
import Switch from '@mui/material/Switch';
import useHandleTheme from '../hooks/useHandleTheme.jsx/';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { io } from 'socket.io-client';

export default function Navbar({ token }) {
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, error } = useGetCurrentUser({ token });
    const { newTheme, themeMsg, themeSuccess, themeLoading, themeError, updateHandleTheme, getUserTheme } = useHandleTheme({ token })
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const className = useSelector((state) => state.className);


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

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

    const handleThemeChange = (event) => {
        updateHandleTheme(event.target.checked)
        handleClassChange(event.target.checked)
    }

    const handleClassChange = (checked) => {
        dispatch(setClassName(checked ? 'bgx-black' : 'bgx-white'));
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const viewNotification = (notification) => {
        setAnchorEl(null)
        if (['like', 'dislike', 'comment'].includes(notification.reason)) {
            navigate(`/posts/${notification.postIdNumber}`)
        }
    }

    useEffect(() => {
        getUserTheme()
        handleClassChange(newTheme === 'dark' ? true : false)
        document.body.style.backgroundColor = (newTheme === 'dark' ? 'black' : 'white')
    }, [newTheme])

    useEffect(() => {
        if (!user) {
            console.log(error);
            return null
        }
        // Conectar al servidor de Socket.IO
        const socket = io('https://nodenetwork-backend.onrender.com'); // Cambia esta URL por la de tu servidor si es necesario
        const username = user.username;

        // Enviar el nombre de usuario al servidor
        socket.emit('username', username);

        // Escuchar el evento 'newNotification' para recibir las notificaciones en tiempo real
        socket.on('newNotification', (notifications) => {
            // Actualizar el estado con la nueva notificación
            setNotifications((prevNotifications) => [...prevNotifications, notifications]);
        });

        // Escuchar el evento 'deleteNotification' para manejar la eliminación
        socket.on('deleteNotification', (notificationId) => {
            // Eliminar el post del estado
            setNotifications((prevNotifications) => prevNotifications.filter(notification => notification._id !== notificationId));
            setAllNotifications((prevNotifications) => prevNotifications.filter(notification => notification._id !== notificationId));
        });

        // Escuchar el evento 'updateNotification' para manejar la actualización
        socket.on('updateNotification', (notification) => {
            // Actualizar el estado con la notificación actualizada
            setNotifications((prevNotifications) => prevNotifications.map((prevNotification) => prevNotification._id === notification._id ? notification : prevNotification));
            setAllNotifications((prevNotifications) => prevNotifications.map((prevNotification) => prevNotification._id === notification._id ? notification : prevNotification));
        });

        // Obtener las publicaciones iniciales del servidor
        socket.on('notifications', (notifications) => {
            setAllNotifications(notifications);
        });

        // Limpiar la conexión cuando el componente se desmonta
        return () => {
            socket.disconnect();
        };
    }, [user]);

    return (
        <Box sx={{ mb: 9 }}>
            <Box className={className} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <Box p={1} sx={isTablet ? { display: 'flex', justifyContent: 'center' } : { display: 'flex', justifyContent: 'space-between' }}>
                    {/* config section */}
                    {isDesktop || isTablet ?
                        <>
                            <Box className="config-section" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={gotoDashboard} variant="text" color="primary">
                                    <SettingsIcon sx={{ color: newTheme === 'dark' ? 'white' : 'black' }}></SettingsIcon>
                                </Button>
                            </Box>

                            <Search handleInputChange={handleInputChange} encodedQuery={encodedQuery} />

                            <Box sx={{ display: 'flex', alignItems: 'center' }} className="notification-section">
                                <Box>
                                    <MaterialUISwitch onChange={handleThemeChange} id='light-switch' sx={{ m: 1 }} disabled={themeLoading} checked={newTheme === 'dark' ? true : false} />
                                </Box>
                                <Button onClick={handleLogout}>
                                    <LogoutIcon sx={{ color: newTheme === 'dark' ? 'white' : 'black' }} />
                                </Button>
                                <Button onClick={gotoFeed}>
                                    <HomeIcon sx={{ color: newTheme === 'dark' ? 'white' : 'black' }} />
                                </Button>
                                {/* <Button>
                            <MessageIcon sx={{ color: newTheme === 'dark' ? 'white':'black' }}></MessageIcon> // pending
                        </Button> */}
                                <Box>
                                    <Button
                                        id="right-top-btn"
                                        aria-controls={open ? 'btn-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <Badge badgeContent={notifications.length + allNotifications.length} color="error">
                                            <NotificationsIcon sx={{ color: newTheme === 'dark' ? 'white' : 'black' }} />
                                        </Badge>
                                    </Button>
                                    <Menu
                                        id="btn-menu"
                                        aria-labelledby="right-top-btn"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        slotProps={{
                                            paper: {
                                                sx: {
                                                    backgroundColor: newTheme === 'dark' ? 'grey' : 'white',
                                                    color: newTheme === 'dark' ? 'white' : 'black',
                                                }
                                            }
                                        }}
                                    >
                                        {notifications.length + allNotifications.length === 0 &&
                                            <MenuItem onClick={handleClose}>No tienes notificaciones</MenuItem>
                                        }

                                        {notifications.map((notification, index) => (
                                            <MenuItem onClick={() => (viewNotification(notification))} key={index}>{notification.description} ({notification.read ? 'leido' : 'no leido'})</MenuItem>
                                        ))}

                                        {allNotifications.map((notification, index) => (
                                            <MenuItem onClick={() => (viewNotification(notification))} key={index}>{notification.description} ({notification.read ? 'leido' : 'no leido'})</MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
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