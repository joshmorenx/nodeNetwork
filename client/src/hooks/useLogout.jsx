// useLogout.js
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const useLogout = (token) => {
    const [logStatusRefresh, setLogStatusRefresh] = useState(false);
    
    const logout = async () => {
        await axios.post('https://nodenetwork-backend.onrender.com/api/logout/', {
            token: token
        }).then((response) => {
            // console.log(response.data.msg);
            // console.log(response.data.logStatusRefresh);
            setLogStatusRefresh(response.data.logStatusRefresh)
        }).catch((error) => {
            // console.log(error.response.data.error);
        })
    }
    if (logStatusRefresh) {
        Cookies.remove('token')
    }

    useEffect(() => {
        if(logStatusRefresh){
            window.location.reload();
        }
    }, [logStatusRefresh]);
    
    return { logout };
};

export default useLogout;
