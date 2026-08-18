import axios from "axios";
import { useState } from "react";

export default function useSendMessage({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendMessage = async ({ username_to, content, video }) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            let response;
            if (video) {
                const formData = new FormData();
                formData.append('username_to', username_to);
                formData.append('content', content || '');
                formData.append('video', video);
                response = await axios.post(`${backendUrl}/api/messages/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post(`${backendUrl}/api/messages/`, { username_to, content }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            setSuccess(response.data.success);
            return { ok: true, message: response.data.message, error: null };
        } catch (err) {
            setError(err);
            return { ok: false, message: null, error: err.response?.data?.message || "No se pudo enviar el mensaje" };
        } finally {
            setLoading(false);
        }
    }

    return { error, success, loading, sendMessage }
}
