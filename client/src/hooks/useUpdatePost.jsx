import axios from "axios";
import { useState } from "react";

export default function useUpdatePost({ token, initialForm = {} }) {
    const [postForm, setPostForm] = useState(initialForm);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {  
        const { name, value } = event.target;
        setPostForm({ ...postForm, [name]: value });
    }

    const updatePost = async (image) => {
        const formData = new FormData();
        formData.append('id', postForm.id);
        formData.append('content', postForm.content);

        if (postForm.latitude && postForm.longitude) {
            formData.append('latitude', postForm.latitude);
            formData.append('longitude', postForm.longitude);
        }

        if (image) {
            formData.append('image', image);
        }

        await axios.put('http://localhost:3000/api/updatePost/', formData,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        }).then((response)=>{
            setMsg(response.data.message);
            setSuccess(response.data.success);
        }).catch((error)=>{
            setError(error);
        })
    }

    return { postForm, msg, error, success, handleInputChange, updatePost }

}