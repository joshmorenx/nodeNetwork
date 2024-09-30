import axios from "axios";
import { useState } from "react";

export default function useCommentLikesAndDislikes({ comment, token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState(null)

    const getCommentLikesAndDislikes = async () => {
        await axios.get(`${backendUrl}/api/comment/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                comment: comment._id
            }
        }).then((response) => {
            setLikes(response.data.commentLikes)
            setDislikes(response.data.commentDislikes)
            setMsg(response.data.message)
            setSuccess(response.data.success)
        }).catch((error)=>{
            setError(error)
        })
    }

    const setCommentLike = async () => {
        await axios.post(`${backendUrl}/api/comment/like`, {
            comment: comment._id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setLikes(response.data.commentLikes)
            setDislikes(response.data.commentDislikes)
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
            setSuccess(response.data.success)
        }).catch((error)=>{
            setError(error)
        })
    }

    return { getCommentLikesAndDislikes, setCommentLike, setCommentDislike, likes, dislikes, error, success, setSuccess, msg }
}