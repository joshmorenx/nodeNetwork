import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetSpecificPosts({ token, username }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);

    const sendRequest = async () => {
        await axios.get(`http://localhost:3000/api/getSpecificPosts/${username}/`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setSuccess(response.data.success);
            setMsg(response.data.message);
            setPosts(response.data.posts);
        }).catch((error) => {
            setError(error);
        })
    }
    return { sendRequest, error, success, msg, posts }
}