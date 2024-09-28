import axios from "axios";
import { useState } from "react";

export function useSetViewedNotification({ token }) {
    const [errorViewed, setErrorViewed] = useState(null);
    const [successViewed, setSuccessViewed] = useState(false);
    const [msgViewed, setMsgViewed] = useState(null);

    const setViewedNotification = async (id) => {
        await axios.put('https://nodenetwork-backend.onrender.com/api/updateReadNotification/', { id: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setSuccessViewed(response.data.success);
            setMsgViewed(response.data.message);
        }).catch((error) => {
            setErrorViewed(error.response.data.error);
        })
    }
    return { errorViewed, successViewed, msgViewed, setViewedNotification }
}