import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export default function Test({ token }) {
    // Estado para almacenar las notificaciones
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const { user, error } = useGetCurrentUser({ token });

    useEffect(() => {
        // Conectar al servidor de Socket.IO
        const socket = io('https://nodenetwork-backend.onrender.com'); // Cambia esta URL por la de tu servidor si es necesario
        const username = user.username;

        // Enviar el nombre de usuario al servidor
        socket.emit('username', username);

        // Escuchar el evento 'newNotification' para recibir las notificaciones en tiempo real
        socket.on('newNotification', (post) => {
            // Actualizar el estado con la nueva notificación
            setPosts((prevPosts) => [...prevPosts, post]);
        });

        // Escuchar el evento 'deleteNotification' para manejar la eliminación
        socket.on('deleteNotification', (postId) => {
            // Eliminar el post del estado
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
            setAllPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
        });

        // Obtener las publicaciones iniciales del servidor
        socket.on('posts', (posts) => {
            setAllPosts(posts);
        });

        // Limpiar la conexión cuando el componente se desmonta
        return () => {
            socket.disconnect();
        };
    }, [user]);

    return (
        <div style={{ backgroundColor: 'white' }}>
            <h1>Notificaciones en Tiempo Real</h1>
            {posts.length > 0 && (
                <ul>
                    {posts.map((notification, index) => (
                        <li style={{ backgroundColor: 'white' }} key={index}>{notification.content}</li>
                    ))}
                </ul>
            )}

            {allPosts.length > 0 && (
                <ul>
                    {allPosts.map((post, index) => (
                        <li style={{ backgroundColor: 'white' }} key={index}>{post.content}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
