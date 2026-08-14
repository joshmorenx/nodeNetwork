import axios from "axios";
import { useState } from "react";

export default function useDeleteConversation({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteConversation = async (conversationId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`${backendUrl}/api/conversations/${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.success;
        } catch (error) {
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, deleteConversation }
}
