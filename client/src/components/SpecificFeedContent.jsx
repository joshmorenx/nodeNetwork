import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import useGetSpecificPosts from "../hooks/useGetSpecificPosts.jsx";
import { CircularProgress } from '@mui/material';

export default function SpecificFeedContent({ token, username, currentUsername, query }) {
    const { sendRequest, error, success, msg, posts, loading, setLoading} = useGetSpecificPosts({ token, username });
    const [allPosts, setAllPosts] = useState([]);
    const [loadedPostsCount, setLoadedPostsCount] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const observer = useRef();

    useEffect(() => {
        sendRequest(query);
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
            { currentUsername === username ? <PostingBox token={token} handleFeedReload={handleFeedReload} /> : <Typography variant="h5" sx={{ textAlign: 'center', mt: 2, color: 'white' }}> Publicaciones hechas por el usuario <span style={{ fontWeight: 'bold' }}>{username}</span> </Typography>}
            <Box>
                {query && !loading && allPosts.length === 0 && <Typography sx={{ color: 'white', mt: '20px' }} variant="h3">No se encontraron resultados</Typography>}

                {!query && !loading && allPosts.length === 0 && <Typography sx={{ color: 'white', mt: '20px', alignItems: 'center' }} variant="h3">Aun no hay publicaciones</Typography>}

                {allPosts.length === 0 ? (
                    loading && (
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    )
                ) : (
                    <>
                        {allPosts.slice(0, loadedPostsCount).map((post, index) => (
                            <PostedContent token={token} key={index} post={post} />
                        ))}
                    </>
                )}

                {loading && success && (
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
