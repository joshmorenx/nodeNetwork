import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function useGetGalleryImage({ username, paths }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [images, setImages] = useState([]);
    const [imageError, setImageError] = useState(null);
    const token = Cookies.get('token');
    const pathsKey = JSON.stringify(paths);

    useEffect(() => {
        let cancelled = false;
        setImages([]);
        setImageError(null);

        if (!username || !paths || paths.length === 0) {
            return;
        }

        const filenames = paths.map(path => path.slice(path.indexOf('gallery') + 'gallery/'.length));

        Promise.all(filenames.map(async (filename) => {
            try {
                const response = await axios.get(`${backendUrl}/api/public/uploads/users/${username}/gallery/${filename}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'arraybuffer' // Esto es importante para recibir imágenes
                });
                const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
                return URL.createObjectURL(imageBlob);
            } catch (err) {
                setImageError(err);
                return null;
            }
        })).then((results) => {
            if (!cancelled) {
                setImages(results.filter(Boolean));
            }
        });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- pathsKey intentionally tracks the serialized list (stable refs should not trigger refetches)
    }, [username, token, backendUrl, pathsKey]);

    return { images, imageError };
}
