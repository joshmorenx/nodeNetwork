import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Test = () => {
    // Estado para almacenar las notificaciones
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Conectar al servidor de Socket.IO
        const socket = io('https://nodenetwork-backend.onrender.com'); // Cambia esta URL por la de tu servidor si es necesario

        // Escuchar el evento 'newNotification' para recibir las notificaciones en tiempo real
        socket.on('newNotification', (notification) => {
            console.log('Nueva notificación recibida:', notification);
            // Actualizar el estado con la nueva notificación
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });

        // Limpiar la conexión cuando el componente se desmonta
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div style={{ backgroundColor: 'white' }}>
            <h1>Notificaciones en Tiempo Real</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.reason}</li>
                ))}
            </ul>
        </div>
    );
};

export default Test;
