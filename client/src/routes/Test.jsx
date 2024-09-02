import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export default function Test({ token }) {
    // Estado para almacenar las notificaciones
    const [notifications, setNotifications] = useState([]);
    const [allNotifications, setAllNotifications] = useState([]);
    const { user, error } = useGetCurrentUser({ token });

    useEffect(() => {
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

        // arreglar esto
        // socket.on('updateNotification', (notification) => {
        //     // si el campo 'read' es falso, elimina la notificación de 'notifications' y 'allNotifications'
        //     if (!notification.read) {
        //         setNotifications((prevNotifications) => prevNotifications.filter(notification => notification._id !== notification._id));
        //         setAllNotifications((prevNotifications) => prevNotifications.filter(notification => notification._id !== notification._id));
        //     }

        //     // si el campo 'read' es verdadero, agrega la notificación a 'allNotifications' y 'notifications'
        //     if (notification.read) {
        //         setAllNotifications((prevNotifications) => [...prevNotifications, notification]);
        //         setNotifications((prevNotifications) => [...prevNotifications, notification]);
        //     }

        //     // Actualiza el estado para reflejar la notificación actualizada
        //     setNotifications((prevNotifications) => prevNotifications.map((n) => (n._id === notification._id ? notification : n)));
        // })

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
        <div style={{ backgroundColor: 'white' }}>
            <h1>Notificaciones en Tiempo Real</h1>
            {notifications.length > 0 && (
                <ul>
                    {notifications.map((notification, index) => (
                        <li style={{ backgroundColor: 'white' }} key={index}>{notification.reason}</li>
                    ))}
                </ul>
            )}

            {allNotifications.length > 0 && (
                <ul>
                    {allNotifications.map((notification, index) => (
                        <li style={{ backgroundColor: 'white' }} key={index}>{notification.reason}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
