import { useState } from "react";
import axios from "axios";

const useDashboard = () => {
    const [userData, setUserData] = useState({
        username: '',
        token: null
    })

    const getUser = async () => {
        await axios.get(`http://localhost:3000/dashboard`,
            {
                username: userData.username,
                token: userData.token,
            }).then((response) => {
                console.log(response.data.msg);
                setUserData(response.data.msg)
            }).catch(error => {
                console.log(error.response.data.error);
                setUserData(error.response.data.error);
            });
    };
    return {
        getUser,
        ...userData,
        userData        
    }
}

export default useDashboard