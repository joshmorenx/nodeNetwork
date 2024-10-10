import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Link, Button } from "@mui/material";
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";
import { Box } from "@mui/material";
import useGetSinglePost from "../hooks/useGetSinglePost.jsx";
import PostedContent from "../components/PostedContent.jsx";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import ImageGallery from "../components/ImageGallery.jsx";
import { Helmet } from "react-helmet";

export default function Gallery({ token }) {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user, error } = useGetCurrentUser({ token });
    const className = useSelector((state) => state.className);
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

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
            <Typography sx={{color: 'white', fontSize: isDesktop ? '3vw' : isTablet ? '5vw' : '10vw', textAlign: 'center' }}> galería de {username} </Typography>
            <Box>
                <ImageGallery token={token} username={username} userData={userData} />
            </Box>
        </>
    )
}