import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetUserGallery({ token, username }) {
    const [userGallery, setUserGallery] = useState([]);  // Almacenar los blobs de las imágenes
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);

    const requestUserGallery = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // Obtener los nombres de las imágenes
            const response = await axios.get("https://nodenetwork-backend.onrender.com/api/getUserGallery", {
                params: {
                    username: username
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const imageFiles = response.data.galleryPictures;  

            // Convertir las imágenes a Blob
            const galleryBlobs = await Promise.all(
                imageFiles.map(async (filename) => {
                    const imageResponse = await axios.get(`https://nodenetwork-backend.onrender.com/api/public/uploads/users/${username}/gallery/${filename}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        responseType: 'arraybuffer'  // Necesario para obtener los datos de imagen como buffer
                    });
                    const imageBlob = new Blob([imageResponse.data], { type: 'image/jpeg' });
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    return imageObjectURL;  // Devolvemos la URL creada para cada Blob
                })
            );

            setUserGallery(galleryBlobs);  // Almacenar las imágenes Blob en el estado
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Error al obtener la galería');
        } finally {
            setIsLoading(false);
        }
    };

    // Ejecutar la solicitud cuando el hook se monte o cambie el username
    useEffect(() => {
        if (username) {
            requestUserGallery();
        }
    }, [username]);

    return { userGallery, isLoading, error, success, msg };
}
