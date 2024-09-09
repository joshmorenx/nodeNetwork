import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export default function Notifications({ token }) {
    // Estado para almacenar las notificaciones
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const { user, error } = useGetCurrentUser({ token });

    useEffect(() => {
        if(!user){
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

    console.log(notifications);
    console.log(allNotifications);
    
    return (
        <div style={{ backgroundColor: 'white' }}>
            <h1>Notificaciones en Tiempo Real</h1>
            {notifications.length > 0 && (
                <ol>
                    {notifications.map((notification, index) => (
                        <li style={{ backgroundColor: 'white' }} key={index}>{notification.description} ({notification.read ? 'leido':'no leido'})</li>
                    ))}
                </ol>
            )}

            {allNotifications.length > 0 && (
                <ol>
                    {allNotifications.map((notification, index) => (
                        <li style={{ backgroundColor: 'white' }} key={index}>{notification.description} ({notification.read ? 'leido':'no leido'})</li>
                    ))}
                </ol>
            )}
        </div>
    )
}
