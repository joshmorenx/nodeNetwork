import axios from "axios";
import { useState } from "react";

export default function useDeletePost({ token, postId }) {
    const [msgDelPost, setMsgDelPost] = useState('');
    const [errDel, setErrDel] = useState('');
    const [successDelete, setSuccessDelete] = useState(false);

    const deletePost = async () => {
        await axios.delete('http://localhost:3000/api/deletePost/', {
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
            setErr(error);
        });
    }
    return { deletePost, msgDelPost, errDel, successDelete, setSuccessDelete };
}