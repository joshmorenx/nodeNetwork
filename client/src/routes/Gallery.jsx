import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import ImageGallery from "../components/ImageGallery.jsx";
import { Helmet } from "react-helmet";

export default function Gallery({ token }) {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user, error } = useGetCurrentUser({ token });
    const className = useSelector((state) => state.className);
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });

    useEffect(() => {
        if (!username && user.username) {
            navigate(`/gallery/${user.username}`);
        }
    }, [username, user.username]);

    useEffect(() => {
        sendRequest();
    }, [])

    return (
        <>
            <Helmet>
                <title>Gallery - Node Network</title>
            </Helmet>
            <Navbar token={token} />
            <Box className={className === 'bgx-black' ? 'bgx-black-semi' : 'bgx-white-semi'} sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }} />
            <Typography className={`gallery-page-title ${className}`}> galería de {username} </Typography>
            <Box sx={{ px: { xs: 1, md: 2 } }}>
                <ImageGallery token={token} username={username} userData={userData} />
            </Box>
        </>
    )
}