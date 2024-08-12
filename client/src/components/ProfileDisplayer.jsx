import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import UserCard from "./UserCard.jsx";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import usePermissions from "../hooks/usePermissions.jsx";
import useFollowUser from "../hooks/useFollowUser.jsx";
import useUnfollowUser from "../hooks/useUnfollowUser.jsx";
// import useUnfollowUser from "../hooks/useUnfollowUser.jsx";
import ImageGallery from "./ImageGallery.jsx";
import SpecificFeedContent from "./SpecificFeedContent.jsx";
import ImageViewer from "./ImageViewer.jsx";
import FollowsButton from "./FollowsButton.jsx";
import { useMediaQuery } from "@mui/material";

export default function ProfileDisplayer({ token, username, currentUsername }) {
    const { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess, loading } = useFollowUser({ token, username });
    const { sendUnfollowRequest, er, msj, suc } = useUnfollowUser({ token, username });
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const { allAccess, cadena } = usePermissions(userData);
    const [imgClickedPath, setImgClickedPath] = useState(null)
    const [abletoUnfollow, setAbletoUnfollow] = useState(false)

    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');


    useEffect(() => {
        sendRequest();
        checkFollowAlreadyExists();
    }, [])

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

    return (
        <>
            <Box className="bgx-black-semi" sx={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}></Box>
            <Box sx={{ width: '100%', display: isDesktop || isTablet ? 'flex' : 'block', alignItems: 'flex-start' }}>
                <Box className="fixed-profile" sx={{ position: isDesktop || isTablet ? 'sticky' : 'static', top: 80, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Box sx={isDesktop || isTablet ? { overflowY: 'auto', overflowX: 'hidden', height: '100vh' } : { overflowY: 'auto' }}>
                        <Box>
                            <UserCard user={userData} allAccess={allAccess} cadena={cadena} handleImageClicked={handleImageClicked} />
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                            {loading ? null : <FollowsButton token={token} username={username} />}
                        </Box>

                        <Box sx={{ ml: isDesktop || isTablet ? 2 : 'auto', mt: 2, mr: isDesktop || isTablet ? 2 : 'auto', width: isDesktop ? '20vw' : isTablet ? '25vw' : '80vw', height: '40%' }}>
                            <ImageGallery token={token} username={username} />
                        </Box>
                    </Box>
                </Box>
                <Box className={isDesktop ? 'wrapper' : 'wrapper-mobile'} sx={{ width: '100%', mr: 2.5 }}>
                    <Box className='one'>
                        {/* <FeedContent token={token} /> */}
                        <SpecificFeedContent token={token} username={username} currentUsername={currentUsername} />
                    </Box>
                </Box>
            </Box>
            <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
        </>
    )
}