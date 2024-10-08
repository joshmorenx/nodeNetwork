import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function useGetGalleryImage({ username }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [galleryImage, setGalleryImage] = useState(null);
    const [imageError, setImageError] = useState(null);
    const token = Cookies.get('token');

    const getGalleryImage = async ( filename ) => {
        try {
            const response = await axios.get(`${backendUrl}/api/public/uploads/users/${username}/gallery/${filename}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'arraybuffer' // Esto es importante para recibir imágenes
            });
            const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setGalleryImage(imageObjectURL);
        } catch (err) {
            setImageError(err);
        }
    };

    return { galleryImage, imageError, getGalleryImage };
}
