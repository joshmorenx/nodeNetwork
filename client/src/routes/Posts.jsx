import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box } from "@mui/material";
import useGetSinglePost from "../hooks/useGetSinglePost.jsx";
import PostedContent from "../components/PostedContent.jsx";
export default function Posts({ token }){
    const { post_id } = useParams();
    const { post, error, success, msg, getSinglePost } = useGetSinglePost({ token, id: post_id });
    const navigate = useNavigate();

    useEffect(()=>{
        if(post_id > 0){
            getSinglePost()
        } else {
            navigate('/feed')
        }
    }, [post_id])

    return(
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Navbar token={token} />
                <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, bgcolor: '#220040' }}></Box>
                <Box sx={{ width: '50vw' }}>
                    {success && <PostedContent token={token} post={post} />}
                </Box>
                {error && <Typography sx={{ color: 'red', stroke: 'red', mt: '20px' }} variant="h3">No se ha encontrado el post</Typography>}
            </Box>
        </>        
    )
}