import axios from "axios";
import { useState } from "react";

export default function useDoLikeOrDislike({ token, postId }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [errorLD, setErrorLD] = useState(null);
    const [successLD, setSuccessLD] = useState(false);
    const [msgLD, setMsgLD] = useState(null);

    const checkIfAlreadyLikedOrDisliked = async (post_id) => {
        await axios.get('http://localhost:3000/api/likeOrDislike/', {
            headers: {
                Authorization: `Bearer ${token}`,
                post_id
            },
        }).then((response) => {
            setLiked(response.data.liked);
            setDisliked(response.data.disliked);
        }).catch((error) => {
            setErrorLD(error);
        })
    }
    const sendDoUndo_Like = async () => {}
    const sendDoUndo_Dislike = async () => {}
    return { checkIfAlreadyLikedOrDisliked, sendDoUndo_Like, sendDoUndo_Dislike, liked, disliked, errorLD, successLD, msgLD }
}