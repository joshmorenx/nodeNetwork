import axios from 'axios'
import { useState, useEffect } from 'react'

export default function useDeleteComment({ token }) {
    const [commentDeleteSuccess, setCommentDeleteSuccess] = useState(false)
    const [msgDeleteComment, setMsgDeleteComment] = useState(null)
    const [errorDeleteComment, setErrorDeleteComment] = useState(null)

    const deleteComment = async (id) => {
        await axios.delete(`https://nodenetwork-backend.onrender.com/api/deleteComment/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                id: id
            }
        }).then((response) => {
            setCommentDeleteSuccess(response.data.success)
            setMsgDeleteComment(response.data.message)
        }).catch((error)=>{
            setErrorDeleteComment(error.data.error)
        })
    }
    return { commentDeleteSuccess, msgDeleteComment, errorDeleteComment, deleteComment }
}