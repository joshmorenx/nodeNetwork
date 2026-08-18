import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Caché de portadas (primer fotograma) por video, compartida entre montajes y recargas de página
const STORAGE_KEY = 'postVideoPosters';

const loadPosterCache = () => {
    try {
        return new Map(Object.entries(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')));
    } catch {
        return new Map();
    }
};

const savePosterToCache = (cacheKey, poster) => {
    try {
        const cache = loadPosterCache();
        cache.set(cacheKey, poster);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(cache)));
    } catch (err) {
        console.error('Error guardando portada del video:', err);
    }
};

export default function useGetPostVideo({ username }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [videoUrl, setVideoUrl] = useState(null);
    const [posterUrl, setPosterUrl] = useState(null);
    const [videoError, setVideoError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');

    // Captura el primer fotograma del video como imagen de vista previa
    const captureFirstFrame = async (blobUrl) => {
        try {
            const video = document.createElement('video');
            video.src = blobUrl;
            video.muted = true;
            video.playsInline = true;
            await new Promise((resolve, reject) => {
                video.addEventListener('loadeddata', resolve, { once: true });
                video.addEventListener('error', () => reject(new Error('no se pudo cargar el video para la portada')), { once: true });
            });
            video.currentTime = Math.min(0.1, (video.duration || 1) / 2);
            await new Promise((resolve) => {
                video.addEventListener('seeked', resolve, { once: true });
            });
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/jpeg', 0.7);
        } catch (err) {
            console.error('Error capturando portada del video:', err);
            return null;
        }
    };

    const getVideo = async (filename) => {
        const cacheKey = `${username}/${filename}`;
        setVideoUrl(null);
        setVideoError(null);
        setLoading(true);
        // Si ya capturamos la portada antes, mostrarla de inmediato mientras carga el video
        const cachedPoster = loadPosterCache().get(cacheKey);
        if (cachedPoster) {
            setPosterUrl(cachedPoster);
        } else {
            setPosterUrl(null);
        }
        try {
            const response = await axios.get(`${backendUrl}/api/public/uploads/users/${username}/gallery/${filename}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob' // Para conservar el tipo MIME del video
            });
            const blobUrl = URL.createObjectURL(response.data);
            setVideoUrl(blobUrl);
            // Capturar el primer fotograma la primera vez que se carga el video
            if (!loadPosterCache().has(cacheKey)) {
                const poster = await captureFirstFrame(blobUrl);
                if (poster) {
                    savePosterToCache(cacheKey, poster);
                    setPosterUrl(poster);
                }
            }
        } catch (err) {
            setVideoError(err);
        } finally {
            setLoading(false);
        }
    };

    return { videoUrl, posterUrl, videoError, loading, getVideo };
}
