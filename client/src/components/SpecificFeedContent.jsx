import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetSpecificPosts from "../hooks/useGetSpecificPosts.jsx";
import { CircularProgress } from '@mui/material';

export default function SpecificFeedContent({ token, username, currentUsername, query }) {
    //any changes here must be made also in FeedContent
    const { posts, setPosts, error, setError, success, setSuccess, msg, setMsg, loading, setLoading, sendRequest } = useGetSpecificPosts({ token, username });
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
        // Reiniciar el estado al cambiar de usuario para no mostrar publicaciones ajenas
        setPosts([]);
        setAllPosts([]);
        setTotalCount(0);
        setLoadedPostsCount(5);
        setSuccess(false);
        setError(null);
        setMsg(null);
        setLoading(false);
        setMountComponent(false);
        sendRequest(query);
        setMountComponent(true);
    }, [username]);

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
            {currentUsername === username ? <PostingBox token={token} handleFeedReload={handleFeedReload} /> : <Typography className="feed-profile-heading" variant="h5"> Publicaciones hechas por el usuario <span style={{ fontWeight: 'bold' }}>{username}</span> </Typography>}
            <Box>
                {query && !loading && allPosts.length === 0 && <Typography className="feed-empty-message" variant="h5">No se encontraron publicaciones</Typography>}

                {!query && !loading && allPosts.length === 0 && <Typography className="feed-empty-message" variant="h5">Aun no hay publicaciones</Typography>}

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

SpecificFeedContent.propTypes = {
    token: PropTypes.string,
    username: PropTypes.string,
    currentUsername: PropTypes.string,
    query: PropTypes.string
};
