import axios from 'axios';
import { useState } from "react";

export default function useAddOrDelPermission({ token, typeUpdate, permId, permName, initialForm = {} }) {
    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState(null);
    const [usersThatUseThisPermission, setUsersThatUseThisPermission] = useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendRequest = async () => {
        await axios.post('https://nodenetwork-backend.onrender.com/api/lastPermission/', {
            typeUpdate: typeUpdate,
            permId: permId,
            permName: permName,
            newPermName: formData.newPermName,
            newPermDesc: formData.newPermDesc
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setMsg(response.data.message);
            setUsersThatUseThisPermission(response.data.usersThatUseThisPermission);
            setSuccess(true)
            // setSuccess(response.data.success);
            // console.log(response.data);
        }).catch((error) => {
            setError(error);
        })
    }
    return { sendRequest, msg, error, success, usersThatUseThisPermission, formData, handleInputChange, setSuccess }

}