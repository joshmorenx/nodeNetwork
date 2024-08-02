import axios from "axios";
import { useState } from "react";

export default function useCaptureAndSendComment({ token }) {
    const [messageComment, setMessageComment] = useState('');
    const [errorComment, setError] = useState('');
    const [successComment, setSuccessComment] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [newCurrentComments, setNewCurrentComments] = useState([]);

    const handleCapture = (event) => {
        event.preventDefault();
        setNewComment(event.target.value);
    }

    const sendComment = async (postId) => {
        // console.log(newComment)
        // console.log(postId)
        await axios.post('https://nodenetwork-backend.onrender.com/api/comment/', 
            {
                postId: postId,
                content: newComment 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=>{
                setSuccessComment(response.data.success);
                setMessageComment(response.data.message);
                setNewCurrentComments(response.data.newCurrentComments);
            }).catch((error)=>{
                setError(error);
            })
    }

    return { sendComment, handleCapture, newComment, messageComment, errorComment, successComment, setSuccessComment, newCurrentComments };
}