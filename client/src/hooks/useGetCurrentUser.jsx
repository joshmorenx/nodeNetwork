import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useGetCurrentUser = ({ token }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const enviarSolicitud = async () => {
            try {
                const response = await axios.get('https://nodenetwork-backend.onrender.com/api/usuario/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
                setError(error);
                Cookies.remove('token');
                window.location.reload();
            }
        };

        enviarSolicitud();
    }, [token]); // Ejecuta la función cada vez que el token cambie

    return { user, error };
};

export default useGetCurrentUser;
