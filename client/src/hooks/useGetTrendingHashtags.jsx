import axios from "axios";
import { useState } from "react";

export default function useGetTrendingHashtags({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [hashtags, setHashtags] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/trendingHashtags/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setHashtags(response.data.hashtags);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }
    return { hashtags, setHashtags, error, loading, sendRequest }
}
