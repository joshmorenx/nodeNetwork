import axios from 'axios';
import { useState } from 'react';

export default function useUpdateProfile( profilePicture, fstName, lstName ) {
    const [msg , setMsg] = useState('')
    
    const sendRequest = async () => {
        await axios.post("http://localhost:3000/api/updateProfile/", {
            profilePicture: profilePicture,
            fstName: fstName,
            lstName: lstName
        }).then((response) => {
            setMsg(response.data.message);
        }).catch((error) => {
            console.log(error);
        })
    }
    return { sendRequest, msg }
}