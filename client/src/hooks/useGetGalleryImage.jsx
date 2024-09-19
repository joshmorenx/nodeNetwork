import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function useGetGalleryImage({ username }) {
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null);
    const token = Cookies.get('token');

    const getGalleryImage = async ( filename ) => {
        try {
            const response = await axios.get(`https://nodenetwork-backend.onrender.com/api/public/uploads/users/${username}/gallery/${filename}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'arraybuffer' // Esto es importante para recibir imágenes
            });
            const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImage(imageObjectURL);
        } catch (err) {
            setImageError(err);
        }
    };

    return { image, imageError, getGalleryImage };
}
