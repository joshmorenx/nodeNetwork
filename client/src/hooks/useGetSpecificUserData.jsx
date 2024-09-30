import axios from "axios";
import { useState } from "react";

export default function useGetSpecificUserData({ token, username }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [userData, setUserData] = useState({});
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(null);

    const sendRequest = async () => {
        await axios.get(`${backendUrl}/api/getSpecificUserData/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setSuccess(response.data.success);
            setUserData(response.data.user);
        }).catch((error) => {
            setErr(error);
        })
    }
    return { sendRequest, userData, success, err };
}