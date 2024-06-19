import React, { useEffect, useState } from "react";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box, Typography } from "@mui/material";
import UserCard from "./UserCard.jsx";
import usePermissions from "../hooks/usePermissions.jsx";
import ImageGallery from "./ImageGallery.jsx";
import FeedContent from "./FeedContent.jsx";


export default function ProfileDisplayer({ token, username }) {
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const { allAccess, cadena } = usePermissions(userData);

    useEffect(() => {
        sendRequest();
    }, [])

    return (
        <>
            <Typography variant="h2" component="h2">
                ES NECESARIO MOSTRAR EL DEL USUARIO EN EL PARAMETRO DE LA URL Y NO LA DEL USUARIO ACTUAL HACER EL AJUSTE NECESARIO
            </Typography>
            <Box sx={{ position: 'fixed', backgroundColor: 'rgb(125, 106, 155)', width: '100%', height: '100%', zIndex: -1 }}></Box>
            <Box sx={{ width: '50%', justifyContent: 'left', alignItems: 'left', display: 'flex', ml: 10 }}>
                <Box className="fixed-profile">
                    <Box sx={{ ml: 0.5, mt: 2, width: '300px' }}>
                        <UserCard user={userData} allAccess={allAccess} cadena={cadena} />
                    </Box>
                    <Box sx={{ ml: 2, mt: 2, mr: 2, width: '91%', height: '40%' }}>
                        <ImageGallery token={token} username={username} />
                    </Box>
                </Box>
                <Box className="wrapper">
                    <Box className='one'>
                        <FeedContent token={token} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}