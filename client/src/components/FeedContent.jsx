import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetPosts from "../hooks/useGetPosts.jsx";
import { CircularProgress } from '@mui/material';

export default function FeedContent({ token, query }) {
    //any changes here must be made also in SpecificFeedContent
    const { posts, setPosts, error, setError, success, setSuccess, msg, setMsg, loading, setLoading, sendRequest } = useGetPosts({ token });
    const [allPosts, setAllPosts] = useState([]);
    const [loadedPostsCount, setLoadedPostsCount] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [mountComponent, setMountComponent] = useState(false);
    const observer = useRef();

    const handleFeedReload = async () => {
        // window.location.reload();
        await setSuccess(false);
        await setMsg(null);
        await setError(null);
        await setLoading(false);
        await setPosts([]);
        await setAllPosts([]);
        await setTotalCount(0);
        await setMountComponent(false);
        await sendRequest(query);
        await setMountComponent(true);
    };

    useEffect(() => {
        sendRequest(query);
        setMountComponent(true);
    }, []);

    useEffect(() => {
        mountComponent && sendRequest(query);
    }, [mountComponent])

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

    return (
        mountComponent && <Box>
            {query ? null : <PostingBox token={token} handleFeedReload={handleFeedReload} />}
            <Box>
                {query && !loading && allPosts.length === 0 && <Typography sx={{ color: 'white', mt: '20px' }} variant="h3">No se encontraron resultados</Typography>}

                {!query && !loading && allPosts.length === 0 && <Typography sx={{ color: 'white', mt: '20px', alignItems: 'center' }} variant="h3">Aun no hay publicaciones</Typography>}

                {allPosts.length === 0 && loading && (
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <CircularProgress />
                    </Box>
                )}

                {allPosts.length > 0 && (
                    <>
                        {allPosts.slice(0, loadedPostsCount).map((post, index) => (
                            <PostedContent token={token} key={index} post={post} handleFeedReload={handleFeedReload} />
                        ))}
                    </>
                )}

                {allPosts.length > 0 && loadedPostsCount < totalCount && loading && (
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
    token: PropTypes.string,
    query: PropTypes.string
};
