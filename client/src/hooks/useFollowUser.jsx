import axios from "axios";
import { useState } from "react";

export default function useFollowUser({ token, username }) {
    const [followMsg, setFollowMsg] = useState(null);
    const [followError, setFollowError] = useState(null);
    const [followSuccess, setFollowSuccess] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const sendFollowRequest = async () => {
        await axios.post('https://nodenetwork-backend.onrender.com/api/relationship/', {
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
        await axios.get('https://nodenetwork-backend.onrender.com/api/relationship/', {
            headers: {
                Authorization: `Bearer ${token}`,
                username_to_follow: username
            }
        }).then((response) => {
            setIsFollowing(response.data.isFollowing);
        }).catch((error) => {
            setFollowError(error);
        })
    }
    return { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess }
}