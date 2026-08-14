import axios from "axios";
import { useState } from "react";

export default function useGetConversations({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/conversations/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setConversations(response.data.conversations);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }

    return { conversations, setConversations, error, loading, sendRequest }
}
