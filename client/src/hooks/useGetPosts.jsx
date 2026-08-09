import axios from "axios";
import { useState, useCallback } from "react";

export default function useGetPosts({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(null);

    const sendRequest = useCallback(async (query) => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/getPosts/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                query: query
            }
        }).then((response) => {
            setSuccess(response.data.success);
            setMsg(response.data.message);
            setPosts(response.data.posts);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, [token, backendUrl]);
    return { posts, setPosts, error, setError, success, setSuccess, msg, setMsg, loading, setLoading, sendRequest }
}