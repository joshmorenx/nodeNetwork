import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function useAddOrDelPermission(typeUpdate, permId, permName) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);

    const sendRequest = async () => {
        try {
            const response = axios.post('http://localhost:3000/api/lastPermission/',{
                typeUpdate: typeUpdate,
                permId: permId,
                permName: permName
            })
            if (response) {
                // setSuccess(response.data.success);
                // setMsg(response.data.message);
            }
        } catch (error) {
            // setError(error);            
        }
    }
    return { sendRequest, msg, error, success }

}