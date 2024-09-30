import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetAllUsers() {
    const backendUrl = import.meta.env.VITE_BACKEND;
    // const [users, setUsers] = useState([]);
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        const sendRequest = async () =>{
            await axios.get(`${backendUrl}/api/usuarios/`)
            .then((response) => {
                // setUsers(response.data);
                setUserNames(response.data.usernames);
                // console.log(response.data.usernames);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        sendRequest();
    }, []);

    return { userNames }
}