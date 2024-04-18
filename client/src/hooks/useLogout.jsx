// useLogout.js
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
const useLogout = (token) => {
    const [logStatusRefresh, setLogStatusRefresh] = useState(false);
    // const logout = () => {
    //     console.log('Cerrando sesión...');
    // };

    const logout = async () => {
        await axios.post('http://localhost:3000/logout', {
            token: token
        }).then((response) => {
            // console.log(response.data.msg);
            // console.log(response.data.logStatusRefresh);
            setLogStatusRefresh(response.data.logStatusRefresh)
        })
    }
    if (logStatusRefresh) {
        Cookies.remove('token')
    }
    return { logout, logStatusRefresh };
};

export default useLogout;
