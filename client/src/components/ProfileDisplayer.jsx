import { useEffect, useState } from "react";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box, Typography } from "@mui/material";
import UserCard from "./UserCard.jsx";
import usePermissions from "../hooks/usePermissions.jsx";


export default function ProfileDisplayer({ token, username }) {
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const { allAccess, cadena } = usePermissions(userData);

    useEffect(() => {
        sendRequest();
    }, [])

    return (
        <Box className="wrapper">
            <UserCard user={userData} allAccess={allAccess} cadena={cadena} />
            <Box>
                <Typography variant="h2" color="initial"> grid demo </Typography>
                <Typography variant="h2" color="initial"> grid demo </Typography>
                <Typography variant="h2" color="initial"> grid demo </Typography>
            </Box>
            <Box>
                <Typography variant="h2" color="initial"> grid demo </Typography>
                <Typography variant="h2" color="initial"> grid demo </Typography>
                <Typography variant="h2" color="initial"> grid demo </Typography>
            </Box>
            <Box>
                <Typography variant="h2" color="initial"> grid demo </Typography>
                <Typography variant="h2" color="initial"> grid demo </Typography>
                <Typography variant="h2" color="initial"> grid demo </Typography>
            </Box>
        </Box>
    )
}