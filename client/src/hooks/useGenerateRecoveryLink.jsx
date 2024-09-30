import { useState } from "react";
import axios from "axios";

export default function useGenerateRecoveryLink({ inputData }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [data, setData] = useState(inputData);
    const [userStatus, setUserStatus] = useState(null); // 'found', 'notFound' o null
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const sendRequest = async () => {
        await axios.post(`${backendUrl}/api/generateRecoveryLink/`, {
            username: data.username
        }).then((response) => {
            setUserStatus(response.data.userFound);
            setEmailSent(response.data.emailSent);
        }).catch((error) => {
            setError(error);
        });
    };

    return { data, userStatus, emailSent, error, handleInputChange, sendRequest };
}
