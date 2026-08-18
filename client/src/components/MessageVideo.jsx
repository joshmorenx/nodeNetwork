import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function MessageVideo({ message }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const token = Cookies.get('token');
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;
        let objectUrl = null;

        const sender = message.from?.username;
        const filename = message.video ? message.video.split('/').pop() : null;

        if (!sender || !filename) {
            return undefined;
        }

        axios.get(`${backendUrl}/api/public/uploads/users/${sender}/chat/${filename}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob' // Para conservar el tipo MIME del video
        }).then((response) => {
            if (cancelled) {
                return;
            }
            objectUrl = URL.createObjectURL(response.data);
            setVideoUrl(objectUrl);
        }).catch(() => {
            if (!cancelled) {
                setVideoUrl(null);
            }
        });

        return () => {
            cancelled = true;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [message.video, message.from?.username]);

    if (!videoUrl) {
        return null;
    }

    return (
        <video
            controls
            preload="metadata"
            src={videoUrl}
            style={{
                maxWidth: '100%',
                maxHeight: 320,
                borderRadius: 12,
                background: '#000',
                marginBottom: 4
            }}
        />
    );
}

MessageVideo.propTypes = {
    message: PropTypes.object.isRequired
};
