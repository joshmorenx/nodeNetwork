import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import UserCard from "./UserCard.jsx";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import usePermissions from "../hooks/usePermissions.jsx";
import useFollowUser from "../hooks/useFollowUser.jsx";
import useUnfollowUser from "../hooks/useUnfollowUser.jsx";
import SpecificFeedContent from "./SpecificFeedContent.jsx";
import ImageViewer from "./ImageViewer.jsx";
import FollowsButton from "./FollowsButton.jsx";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import useGetFollows from "../hooks/useGetFollows.jsx"
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";

export default function ProfileDisplayer({ token, username, currentUsername }) {
    const { user, error } = useGetCurrentUser({ token });
    const { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess, loading } = useFollowUser({ token, username });
    const { sendUnfollowRequest, er, msj, suc } = useUnfollowUser({ token, username });
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const { messageFollows, successFollows, errorFollows, followers, following, getFollows } = useGetFollows({ token })
    const { allAccess, cadena } = usePermissions(userData);
    const [imgClickedPath, setImgClickedPath] = useState(null)
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

    const fontSizeStyles = {
        fontSize: isDesktop ? '1vw' : isTablet ? '1vw' : '3vw'
    }

    const handleImageClicked = (event) => {
        if (event) {
            setImgClickedPath(event.target.src);
        }
    }

    const follow = async () => {
        await sendFollowRequest()
        await checkFollowAlreadyExists()
    }

    const unfollow = async () => {
        await sendUnfollowRequest()
        await checkFollowAlreadyExists()
    }

    useEffect(() => {
        sendRequest();
        checkFollowAlreadyExists();
    }, [])

    useEffect(() => {
        username && getFollows(username)
    }, [username])

    return (
        <>
            <Box className={className === 'bgx-black' ? 'bgx-black-semi' : 'bgx-white-semi'} sx={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}></Box>
            <Box sx={{ width: '100%', display: isDesktop || isTablet ? 'flex' : 'block', alignItems: 'flex-start' }}>
                <Box className="fixed-profile" sx={{ position: isDesktop || isTablet ? 'sticky' : 'static', top: 80, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Box sx={isDesktop || isTablet ? { overflowY: 'auto', overflowX: 'hidden', height: '100vh' } : { overflowY: 'auto' }}>
                        <Box>
                            <UserCard user={userData} allAccess={allAccess} cadena={cadena} handleImageClicked={handleImageClicked} id={user.userId} />
                        </Box>

                        <Box sx={{ mt: 2, mb: 2 }}>
                            {loading ? null : <FollowsButton token={token} username={username} fontSizeStyles={fontSizeStyles} />}
                        </Box>

                        {loading ? null : 
                        <Box sx={{ gap: 2, display: 'flex', justifyContent: 'center' }}>
                            <Link href={`/follows/${username}#followers`}>
                                <Button sx={{ fontSize: fontSizeStyles }} color="success" variant="contained">
                                    Seguidores ({followers.length})
                                </Button>
                            </Link>
                            <Link href={`/follows/${username}#following`} variant="contained">
                                <Button sx={{ fontSize: fontSizeStyles }} color="success" variant="contained">
                                    Siguiendo ({following.length})
                                </Button>
                            </Link>
                        </Box>}

                        <Box sx={{ ml: isDesktop || isTablet ? 2 : 'auto', mt: 0, mr: isDesktop || isTablet ? 2 : 'auto', width: isDesktop ? '20vw' : isTablet ? '25vw' : '80vw', height: '40%' }}>
                            {!user.username ? null : <Link href={`/gallery/${username}`}>
                                <Button color="info" variant="contained" sx={{ mt: 2, fontSize: fontSizeStyles }}>
                                    {user.username === username ? 'ir a mi galeria' : 'ir a la galeria de ' + username}
                                </Button>
                            </Link>}
                        </Box>

                    </Box>
                </Box>

                <Box className={isDesktop ? 'wrapper' : 'wrapper-mobile'} sx={{ width: '100%', mr: 2.5 }}>

                    <Box className='one'>
                        {/* <FeedContent token={token} /> */} {/* must refactor the specific feed content to be only using the feed content component  */}
                        <SpecificFeedContent token={token} username={username} currentUsername={currentUsername} />
                    </Box>
                </Box>
            </Box>
            <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
        </>
    )
}