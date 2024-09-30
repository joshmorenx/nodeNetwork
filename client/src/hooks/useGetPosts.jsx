import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetPosts({ token, username }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    const sendRequest = async (query) => {
        await axios.get(`${backendUrl}/api/getPosts/`, {
            headers:{
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
    }
    return { sendRequest, error, success, msg, posts, loading, setLoading}
}