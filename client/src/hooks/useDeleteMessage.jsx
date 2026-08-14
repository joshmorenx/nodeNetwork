import axios from "axios";
import { useState } from "react";

export default function useDeleteMessage({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteMessage = async (messageId, scope) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`${backendUrl}/api/messages/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { scope }
            });
            return response.data.success;
        } catch (error) {
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, deleteMessage }
}
