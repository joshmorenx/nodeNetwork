import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { setClassName } from '../redux/actions';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button'

export default function Notifications({ token, newTheme }) {
    // Estado para almacenar las notificaciones
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const { user, error } = useGetCurrentUser({ token });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const className = useSelector((state) => state.className);

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
            window.location.replace(`https://node-network-chi.vercel.app/posts/${notification.postIdNumber}`)
        }
    }

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
                    <MenuItem sx={{ textWrap:'wrap' }} onClick={handleClose}>No tienes notificaciones</MenuItem>
                }

                {notifications.map((notification, index) => (
                    <MenuItem sx={{ textWrap:'wrap' }} onClick={() => (viewNotification(notification))} key={index}>{notification.description} ({notification.read ? 'leido' : 'no leido'})</MenuItem>
                ))}

                {allNotifications.map((notification, index) => (
                    <MenuItem sx={{ textWrap:'wrap' }} onClick={() => (viewNotification(notification))} key={index}>{notification.description} ({notification.read ? 'leido' : 'no leido'})</MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
