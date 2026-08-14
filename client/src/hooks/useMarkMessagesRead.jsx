import axios from "axios";
import { useState } from "react";

export default function useMarkMessagesRead({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const markMessagesRead = async (username_from) => {
        setError(null);
        try {
            const response = await axios.put(`${backendUrl}/api/messages/read/`, { username_from }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess(response.data.success);
        } catch (error) {
            setError(error);
        }
    }

    return { error, success, markMessagesRead }
}
