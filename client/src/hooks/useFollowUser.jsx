import axios from "axios";
import { useState } from "react";

export default function useFollowUser({ token, username }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [loading, setLoading] = useState(true);
    const [followMsg, setFollowMsg] = useState(null);
    const [followError, setFollowError] = useState(null);
    const [followSuccess, setFollowSuccess] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const sendFollowRequest = async () => {
        await axios.post(`${backendUrl}/api/relationship/`, {
            username_to_follow: username,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setFollowSuccess(response.data.success);
            setFollowMsg(response.data.message);
        }).catch((error) => {
            setFollowError(error);
        })
    }

    const checkFollowAlreadyExists = async () => {
        await axios.get(`${backendUrl}/api/relationship/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                username_to_follow: username
            }
        }).then((response) => {
            setIsFollowing(response.data.isFollowing);
            setLoading(false);
        }).catch((error) => {
            setFollowError(error);
        })
    }
    return { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess, loading }
}