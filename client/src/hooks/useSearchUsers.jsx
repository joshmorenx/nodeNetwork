import axios from "axios";
import { useState } from "react";

export default function useSearchUsers({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendRequest = async (query) => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/searchUsers/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                query: query
            }
        }).then((response) => {
            setSuccess(response.data.success);
            setUsers(response.data.users);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        })
    }
    return { users, setUsers, error, success, loading, sendRequest }
}
