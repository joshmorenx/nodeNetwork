import axios from 'axios';
import { useState, useEffect } from 'react';

const useGetUser = ({ token }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const enviarSolicitud = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/usuario', {
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
            }
        };

        enviarSolicitud();
    }, [token]); // Ejecuta la función cada vez que el token cambie

    return { user, error };
};

export default useGetUser;
