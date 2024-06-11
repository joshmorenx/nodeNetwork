import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetPosts from "../hooks/useGetPosts.jsx";
import { CircularProgress } from '@mui/material';

export default function FeedContent({ token }) {
    const { sendRequest, error, success, msg, posts } = useGetPosts({ token });
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        if (success) setAllPosts(posts);
    }, [success, posts]);

    const handleFeedReload = () => {
        setAllPosts([]);
        sendRequest();
    };
    
    return (
        <Box>
            <PostingBox token={token} handleFeedReload={handleFeedReload} />
            {/* <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleFeedReload()}>Reload</Button> */}
            <Box>
                {allPosts.length > 0 ? (
                    allPosts.map((post, index) => <PostedContent token={token} key={index} post={post} />)
                ) : (
                    <CircularProgress />
                )}
            </Box>
        </Box>
    );
}

FeedContent.propTypes = {
    token: PropTypes.string
};
