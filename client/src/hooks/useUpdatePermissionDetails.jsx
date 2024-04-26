import { useState } from "react";
import axios from "axios";

export default function useUpdatePermissionDetails(id, newDescription) {
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const sendRequest = async () => {
        await axios.post("http://localhost:3000/api/modifyPermissions/", {
            id: id,
            newDescription: newDescription
        }).then((response) => {
            setMsg(response.data.message);
            setSuccess(response.data.success);
        }).catch((error) => {
            setError(error);
        })
    }
    return { sendRequest, msg, error, success }
}