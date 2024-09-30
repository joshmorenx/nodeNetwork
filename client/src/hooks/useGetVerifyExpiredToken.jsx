import axios from "axios";
import { useState } from "react";

export function useGetVerifyExpiredToken() {
    const backendUrl = import.meta.env.VITE_BACKEND
    const [expired, setExpired] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);

    const getVerifyExpiredToken = async (token) => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/verifyExpiredToken/`, {
            params: {
                token: token
            }
        }).then((response) => {
            setSuccess(response.data.success);
            setMsg(response.data.message);
            setDecodedToken(response.data.decodedToken);

            setLoading(false);
        }).catch((error) => {
            setError(error);
            setMsg(error.response.data.message);
            setSuccess(error.response.data.success);
            setExpired(error.response.data.expired);

            setLoading(false);
        })
    }
    return { expired, error, success, msg, loading, decodedToken, getVerifyExpiredToken }
}