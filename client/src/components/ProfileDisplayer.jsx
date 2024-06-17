import { useEffect, useState } from "react";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box } from "@mui/material";
import UserCard from "./UserCard.jsx";
import usePermissions from "../hooks/usePermissions.jsx";


export default function ProfileDisplayer ({ token, username }) {
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const { allAccess, cadena } = usePermissions(userData);

    console.log(userData);

    useEffect(() => {
        sendRequest();
    }, [])

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <UserCard user={userData} allAccess={allAccess} cadena={cadena} />
        </Box>
    )
}