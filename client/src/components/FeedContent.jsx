import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Box } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetPosts from "../hooks/useGetPosts.jsx";

export default function FeedContent({ token }) {
    const { sendRequest, error, success, msg, posts } = useGetPosts({ token });    

    // useEffect(() => {
    //     sendRequest()
    //     if (posts.length > 0) {
    //         console.log(posts[0].content);
    //     }
    // }, [])


    return (
        <>
            <Box>
                <PostingBox token={token} />
                <PostedContent token={token} />
                <PostedContent token={token} />
            </Box>
        </>
    )
}

FeedContent.propTypes = {
    token: PropTypes.string
}   
