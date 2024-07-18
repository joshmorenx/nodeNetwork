import FeedNavbar from "../components/FeedNavbar.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box } from "@mui/material";
import useGetSinglePost from "../hooks/useGetSinglePost.jsx";

export default function Posts({ token }){
    const { post_id } = useParams();
    const { post, error, success, msg, getSinglePost } = useGetSinglePost({ token, id: post_id });

    useEffect(()=>{
        if(post_id) getSinglePost();
    }, [post_id])

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
            <FeedNavbar token={token} />
            <Box>Posts page</Box>
            {post_id && <Box>{post_id}</Box>}
            {post && <Box>{post.content}</Box>}
            {error && <Typography sx={{ color: 'red' }}>
                No se ha encontrado el post
            </Typography>}
        </Box>
        
    )
}