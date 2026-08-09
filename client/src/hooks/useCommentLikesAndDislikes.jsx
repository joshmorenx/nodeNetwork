import axios from "axios";
import { useState, useCallback } from "react";

export default function useCommentLikesAndDislikes({ comment, token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState(null)
    const [loading, setLoading] = useState(true)

    const getCommentLikesAndDislikes = useCallback(async () => {
        await axios.get(`${backendUrl}/api/comment/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                comment: comment._id
            }
        }).then((response) => {
            setLikes(response.data.commentLikes)
            setDislikes(response.data.commentDislikes)
            setLiked(response.data.liked)
            setDisliked(response.data.disliked)
            setMsg(response.data.message)
            setSuccess(response.data.success)
            setLoading(false);
        }).catch((error)=>{
            setError(error)
            setLoading(false);
        })
    }, [token, comment, backendUrl]);

    const setCommentLike = async () => {
        await axios.post(`${backendUrl}/api/comment/like`, {
            comment: comment._id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setLikes(response.data.likes)
            setDislikes(response.data.dislikes)
            setLiked(response.data.liked)
            setDisliked(response.data.disliked)
            setSuccess(response.data.success)
        }).catch((error)=>{
            setError(error)
        })
    }

    const setCommentDislike = async () => {
        await axios.post(`${backendUrl}/api/comment/dislike`, {
            comment: comment._id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setLikes(response.data.likes)
            setDislikes(response.data.dislikes)
            setLiked(response.data.liked)
            setDisliked(response.data.disliked)
            setSuccess(response.data.success)
        }).catch((error)=>{
            setError(error)
        })
    }

    return { getCommentLikesAndDislikes, setCommentLike, setCommentDislike, likes, dislikes, liked, disliked, error, success, setSuccess, msg, loading }
}