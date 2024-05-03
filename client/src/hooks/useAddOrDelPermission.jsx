import axios from 'axios';
import { useState } from "react";

export default function useAddOrDelPermission(typeUpdate, permId, permName, initialForm = {}) {
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
        await axios.post('http://localhost:3000/api/lastPermission/', {
            typeUpdate: typeUpdate,
            permId: permId,
            permName: permName,
            newPermName: formData.newPermName,
            newPermDesc: formData.newPermDesc
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