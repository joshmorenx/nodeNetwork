import axios from "axios";
import { useState } from "react";

export default function useGetSinglePost({ token, id }) {
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);

    const getSinglePost = async () => {
        await axios.get('https://nodenetwork-backend.onrender.com/api/getSinglePost/', {
            headers: {
                Authorization: `Bearer ${token}`,
                id: id
            }
        }).then((response)=>{
            setSuccess(response.data.success);
            setMsg(response.data.message);
            setPost(response.data.post);
        }).catch((error)=>{
            setError(error);
        })
    }

    return { post, error, success, msg, getSinglePost }
}