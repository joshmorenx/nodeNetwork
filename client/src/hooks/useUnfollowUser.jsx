import axios from "axios";
import { useState } from "react";

export default function useUnfollowUser({ token, username }) {
    const [er, setEr] = useState(null);
    const [msj, setMsj] = useState(null);
    const [suc, setSuc] = useState(false);

    const sendUnfollowRequest = async () => {
        await axios.delete("http://localhost:3000/api/relationship/", {
            headers: {
                Authorization: `Bearer ${token}`,
                username_to_unfollow: username
            }
        }).then((response) => {
            setSuc(response.data.success);
            setMsj(response.data.message);
        }).catch((error) => {
            setEr(error);
        })
    };

    return { sendUnfollowRequest, er, msj, suc };
}