import axios from "axios";
import { useState } from "react";

export default function useSendMessage({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendMessage = async ({ username_to, content }) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            const response = await axios.post(`${backendUrl}/api/messages/`, { username_to, content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess(response.data.success);
            return response.data.message;
        } catch (error) {
            setError(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { error, success, loading, sendMessage }
}
