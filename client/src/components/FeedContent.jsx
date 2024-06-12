import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { Box } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetPosts from "../hooks/useGetPosts.jsx";
import { CircularProgress } from '@mui/material';

export default function FeedContent({ token }) {
    const { sendRequest, error, success, msg, posts } = useGetPosts({ token });
    const [allPosts, setAllPosts] = useState([]);
    const [loadedPostsCount, setLoadedPostsCount] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        if (success) {
            setAllPosts(posts);
            setTotalCount(posts.length);
        }
    }, [success, posts]);

    useEffect(() => {
        if (!loading && loadedPostsCount < totalCount) {
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setLoading(true);
                    setTimeout(() => {
                        setLoadedPostsCount(prevCount => Math.min(prevCount + 5, totalCount));
                        setLoading(false);
                    }, 1000);
                }
            });

            if (observer.current) {
                observer.current.observe(document.querySelector("#loadMoreTrigger"));
            }
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loadedPostsCount, totalCount, loading]);

    const handleFeedReload = () => {
        setAllPosts([]);
        setLoadedPostsCount(5);
        sendRequest();
    };

    return (
        <Box>
            <PostingBox token={token} handleFeedReload={handleFeedReload} />
            <Box>
                {allPosts.length === 0 ? (
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {allPosts.slice(0, loadedPostsCount).map((post, index) => (
                            <PostedContent token={token} key={index} post={post} />
                        ))}
                    </>
                )}

                {loading && (
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
                <div id="loadMoreTrigger" style={{ height: '20px' }}></div>
            </Box>
        </Box>
    );
}

FeedContent.propTypes = {
    token: PropTypes.string
};
