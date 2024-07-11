import axios from "axios";
import { useState } from "react";

export default function useUpdatePost({ token, postId, initialForm = {} }) {
    const [postForm, setPostForm] = useState(initialForm);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {  
        const { name, value } = event.target;
        setPostForm({ ...postForm, [name]: value });
    }
    
    const updatePost = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('content', postForm.content);
        formData.append('date_updated', postForm.date_updated);
        await axios.put(`http://localhost:3000/api/updatePost/${postId}`, formData, { // provisional url (not working yet)
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }   
        }).then((response) => {
            setMsg(response.data.message);
            setSuccess(response.data.success);
        }).catch((error) => {
            setError(error);
        })
    }

    return { postForm, msg, error, success, handleInputChange, updatePost }

}