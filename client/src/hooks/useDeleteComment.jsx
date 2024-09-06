import axios from 'axios'
import { useState, useEffect } from 'react'

export default function useDeleteComment({ token }) {
    const [commentDeleteSuccess, setCommentDeleteSuccess] = useState(false)
    const [msgDeleteComment, setMsgDeleteComment] = useState(null)
    const [errorDeleteComment, setErrorDeleteComment] = useState(null)

    const deleteComment = async (commentId) => {
        await axios.delete('https://nodenetwork-backend.onrender.com/api/comment/', {
            headers: {
                Authorization: `Bearer ${token}`,
                comment_id: commentId 
            }
        }).then((response) => {
            setCommentDeleteSuccess(response.data.success)
            setMsgDeleteComment(response.data.message)
        }).catch((error)=>{
            setErrorDeleteComment(error.data.error)
        })
    }
    return { commentDeleteSuccess, msgDeleteComment, errorDeleteComment, deleteComment, setCommentDeleteSuccess }
}