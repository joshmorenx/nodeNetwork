import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box } from "@mui/material";
import useGetSinglePost from "../hooks/useGetSinglePost.jsx";
import PostedContent from "../components/PostedContent.jsx";
import { useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';

export default function Posts({ token }) {
    const { post_id } = useParams();
    const { post, error, success, loading, setLoading, msg, getSinglePost } = useGetSinglePost({ token, id: post_id });
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const className = useSelector((state) => state.className);

    useEffect(() => {
        setLoading(true)
        if (post_id > 0) {
            getSinglePost()
        } else {
            navigate('/feed')
        }
    }, [post_id])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Navbar token={token} />
                <Box className={className} sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}></Box>
                {loading && <CircularProgress />}
                {success && !loading &&
                    <Box sx={{ width: isDesktop ? '60vw' : isTablet ? '80vw' : '100vw' }}>
                        <PostedContent token={token} post={post} isolated={true} />
                    </Box>
                }
                {error && <Typography sx={{ color: 'red', stroke: 'red', mt: '20px' }} variant="h3">No se ha encontrado el post</Typography>}
            </Box>
        </>
    )
}