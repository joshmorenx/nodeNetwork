import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetUserGallery({ token, username }) {
    const backendUrl = import.meta.env.VITE_BACKEND
    const [userGallery, setUserGallery] = useState([]);  // Blobs de las imágenes
    const [userVideos, setUserVideos] = useState([]);    // Blobs de los videos
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);

    const requestUserGallery = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            // Obtener los nombres de los archivos (imágenes y videos)
            const response = await axios.get(`${backendUrl}/api/getUserGallery`, {
                params: {
                    username: username
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const imageFiles = response.data.galleryPictures || [];
            const videoFiles = response.data.galleryVideos || [];

            // Convertir las imágenes a Blob
            const galleryBlobs = await Promise.all(
                imageFiles.map(async (filename) => {
                    const imageResponse = await axios.get(`${backendUrl}/api/public/uploads/users/${username}/gallery/${filename}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        responseType: 'arraybuffer'  // Necesario para obtener los datos de imagen como buffer
                    });
                    const imageBlob = new Blob([imageResponse.data], { type: 'image/jpeg' });
                    return URL.createObjectURL(imageBlob);
                })
            );

            // Convertir los videos a Blob (responseType 'blob' conserva el tipo MIME)
            const videoBlobs = await Promise.all(
                videoFiles.map(async (filename) => {
                    const videoResponse = await axios.get(`${backendUrl}/api/public/uploads/users/${username}/gallery/${filename}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        responseType: 'blob'
                    });
                    return URL.createObjectURL(videoResponse.data);
                })
            );

            setUserGallery(galleryBlobs);
            setUserVideos(videoBlobs);
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

    return { userGallery, userVideos, isLoading, error, success, msg };
}
