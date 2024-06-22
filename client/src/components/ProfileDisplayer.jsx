import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import UserCard from "./UserCard.jsx";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import usePermissions from "../hooks/usePermissions.jsx";
import useFollowUser from "../hooks/useFollowUser.jsx";
// import useUnfollowUser from "../hooks/useUnfollowUser.jsx";
import ImageGallery from "./ImageGallery.jsx";
import SpecificFeedContent from "./SpecificFeedContent.jsx";
import ImageViewer from "./ImageViewer.jsx";

export default function ProfileDisplayer({ token, username, currentUsername }) {
    const { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess } = useFollowUser({ token, username });
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const { allAccess, cadena } = usePermissions(userData);
    const [imgClickedPath, setImgClickedPath] = useState(null)


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

    return (
        <>
            <Box sx={{ position: 'fixed', backgroundColor: 'rgb(125, 106, 155)', width: '100%', height: '100%', zIndex: -1 }}></Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                <Box className="fixed-profile" sx={{ position: 'sticky', top: 80, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

                    <Box sx={{  }}>
                        <UserCard user={userData} allAccess={allAccess} cadena={cadena} handleImageClicked={handleImageClicked} />
                    </Box>
                    
                    { currentUsername !== username && 
                        <Box sx={{ mt: 2 }}>
                            { isFollowing && <Button variant="contained"> Siguiendo a {username} </Button> }
                            { !isFollowing && <Button variant="contained" onClick={() => follow(username)}> Seguir a {username} </Button> }
                        </Box>
                    }
                    
                    <Box sx={{ ml: 2, mt: 2, mr: 2, width: '20vw', height: '40%' }}>
                        <ImageGallery token={token} username={username} />
                    </Box>
                </Box>
                <Box className="wrapper" sx={{ width: '100%', mr: 2.5 }}>
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