import axios from "axios";
import { useState } from "react";

export default function useGetMessages({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async (username) => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/messages/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setMessages(response.data.messages);
            setConversationId(response.data.conversationId);
            setOtherUser(response.data.otherUser);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }

    return { messages, setMessages, conversationId, otherUser, error, loading, sendRequest }
}
