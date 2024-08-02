import axios from "axios";
import { useState } from "react";

export default function useDoLikeOrDislike({ token }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [errorLD, setErrorLD] = useState('');
    const [successLD, setSuccessLD] = useState(false);
    const [msgLD, setMsgLD] = useState('');

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const sendDoUndo_Like = async (post_id) => {
        await axios.post('https://nodenetwork-backend.onrender.com/api/likeOrDislike/', { post_id: post_id, option: 'like' }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);
            setSuccessLD(response.data.success)
        }).catch((error)=>{
            setErrorLD(error);
        })
    }

    const sendDoUndo_Dislike = async (post_id) => {
        await axios.post('https://nodenetwork-backend.onrender.com/api/likeOrDislike/', { post_id: post_id, option: 'dislike' }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);
            setSuccessLD(response.data.success)
        }).catch((error)=>{
            setErrorLD(error);
        })
    }
    return { sendDoUndo_Like, sendDoUndo_Dislike, liked, disliked, errorLD, successLD, msgLD, setMsgLD, setSuccessLD, likes, dislikes }
}