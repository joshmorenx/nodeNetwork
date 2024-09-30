import axios from "axios";
import { useState } from "react";

export default function useDeletePost({ token, postId }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [msgDelPost, setMsgDelPost] = useState('');
    const [errDel, setErrDel] = useState('');
    const [successDelete, setSuccessDelete] = useState(false);

    const deletePost = async () => {
        await axios.delete(`${backendUrl}/api/deletePost/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                post_id: postId
            }
        })
        .then((response)=>{
            setSuccessDelete(response.data.success);
            setMsgDelPost(response.data.message);
        })
        .catch((error)=>{
            setErrDel(error);
        });
    }
    return { deletePost, msgDelPost, errDel, successDelete, setSuccessDelete };
}