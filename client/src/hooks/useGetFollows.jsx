import axios from 'axios'
import { useState } from 'react'

export default function useGetFollows({ token }){
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [messageFollows, setMessageFollows] = useState('')
    const [successFollows, setSuccessFollows] = useState(false)
    const [errorFollows, setErrorFollows] = useState('')
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    const getFollows = async(username) => {
        await axios.get(`${backendUrl}/api/relationships/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                param_username: username
            },
        }).then((response)=>{
            setMessageFollows(response.data.message)
            setSuccessFollows(response.data.success)
            setFollowers(response.data.followers)
            setFollowing(response.data.following)
        }).catch((response)=>{
            setErrorFollows(response.data.error)
        })
    }
    return {messageFollows, successFollows, errorFollows, followers, following, getFollows}
}