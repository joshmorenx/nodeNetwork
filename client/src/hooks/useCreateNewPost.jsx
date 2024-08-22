import axios from "axios";
import { useState, useEffect } from "react";

export default function useCreateNewPost({ token, initialForm = {} }) {
    const [postForm, setPostForm] = useState(initialForm);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostForm({ ...postForm, [name]: value });
    };

    useEffect(() => {
        if(msg) console.log(msg);
    }, [msg]);

    const sendRequest = async (image) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('content', postForm.content);

        if (postForm.latitude && postForm.longitude) {
            formData.append('latitude', postForm.latitude);
            formData.append('longitude', postForm.longitude);
        }

        if (image) {
            formData.append('image', image);
        }

        await axios.post('https://nodenetwork-backend.onrender.com/api/createNewPost/', formData,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response)=>{
            setMsg(response.data.message);
            setSuccess(response.data.success);
            setLoading(false);
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        })
    }

    return { sendRequest, msg, error, success, handleInputChange, postForm, loading };
}