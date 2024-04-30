import axios from 'axios';
import { useState, useEffect } from "react";

export default function useAddOrDelPermission(typeUpdate, permId, permName) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [usersThatUseThisPermission, setUsersThatUseThisPermission] = useState([])

    const sendRequest = async () => {
        await axios.post('http://localhost:3000/api/lastPermission/', {
            typeUpdate: typeUpdate,
            permId: permId,
            permName: permName
        }).then((response) => {
            setMsg(response.data.message);
            setUsersThatUseThisPermission(response.data.usersThatUseThisPermission);
            // setSuccess(response.data.success);
            // console.log(response.data);
        }).catch((error) => {
            // setError(error);
        })
    }
    return { sendRequest, msg, error, success, usersThatUseThisPermission }

}