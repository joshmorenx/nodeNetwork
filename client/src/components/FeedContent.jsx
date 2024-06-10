import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { Box } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetPosts from "../hooks/useGetPosts.jsx";

export default function FeedContent({ token }) {
    const { sendRequest, error, success, msg, posts } = useGetPosts({ token });    
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        window.addEventListener('load', sendRequest());
        // Remove the event listener on cleanup
        return () => {
            window.removeEventListener('load', sendRequest());
        };
    }, []);

    useEffect(() => {
        if(success) setAllPosts(posts);
    }, [success, posts]);

    // Sort posts by date_created in descending order (newest first)
    const sortedPosts = useMemo(() => {
        return allPosts.slice().sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
    }, [allPosts]);

    const showPostedContent = () => {
        if(sortedPosts.length > 0) {
            return (
                sortedPosts.map((post, index) => <PostedContent token={token} key={index} post={post} />)
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <Box>
                <PostingBox token={token} />
                { showPostedContent() }
            </Box>
        </>
    );
}

FeedContent.propTypes = {
    token: PropTypes.string
};
