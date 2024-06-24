import axios from "axios"
import { useState, useEffect } from "react"

export default function useGetPostLikesAndDislikes({ post }) {
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [msgLD, setMsgLD] = useState(null)
    const [successLD, setSuccessLD] = useState(false)
    const [errorLD, setErrorLD] = useState(null)

    const getPostLikesAndDislikes = async () => {
        await axios.get('http://localhost:3000/api/getPostLikesAndDislikes/', {
            headers: {
                post: post
            }
        }).then((response) => {
            setMsgLD(response.data.message)
            setLikes(response.data.likes)
            setDislikes(response.data.dislikes)
            setSuccessLD(response.data.success)
        }).catch((error) => {
            setErrorLD(error)
            setSuccessLD(false)
        })
    }
    return { getPostLikesAndDislikes, likes, dislikes, msgLD, successLD, errorLD }
}