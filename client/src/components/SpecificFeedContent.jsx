import PropTypes from 'prop-types';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from 'react-redux';
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';
import FeedSkeleton from './FeedSkeleton.jsx';
import useGetSpecificPosts from "../hooks/useGetSpecificPosts.jsx";

export default function SpecificFeedContent({ token, username, currentUsername, query }) {
    //any changes here must be made also in FeedContent
    const className = useSelector((state) => state.className);
    const { posts, setPosts, setError, success, setSuccess, setMsg, loading, setLoading, sendRequest } = useGetSpecificPosts({ token, username });
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

    const loadMorePosts = useCallback(() => {
        if (loading || loadedPostsCount >= totalCount) return;
        setLoading(true);
        setTimeout(() => {
            setLoadedPostsCount(prevCount => Math.min(prevCount + 5, totalCount));
            setLoading(false);
        }, 600);
    }, [loading, loadedPostsCount, totalCount, setLoading]);

    useEffect(() => {
        sendRequest(query);
        setMountComponent(true);
    }, [sendRequest, query]);

    useEffect(() => {
        mountComponent && sendRequest(query);
    }, [mountComponent, sendRequest, query])

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
                    loadMorePosts();
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
    }, [loadedPostsCount, totalCount, loading, loadMorePosts]);

    return (
        mountComponent && <Box className="feed-content">
            {currentUsername === username ? <PostingBox token={token} handleFeedReload={handleFeedReload} /> : <Typography className={`feed-subheader ${className}`}> Publicaciones hechas por el usuario <span style={{ fontWeight: 'bold' }}>{username}</span> </Typography>}
            <Box>
                {query && !loading && allPosts.length === 0 && <Typography className={`feed-empty-state ${className}`}>No se encontraron resultados</Typography>}

                {!query && !loading && allPosts.length === 0 && <Typography className={`feed-empty-state ${className}`}>Aun no hay publicaciones</Typography>}

                {allPosts.length === 0 && loading && (
                    <FeedSkeleton count={3} />
                )}

                {allPosts.length > 0 && (
                    <>
                        {allPosts.slice(0, loadedPostsCount).map((post, index) => (
                            <PostedContent token={token} key={post.postId || index} post={post} handleFeedReload={handleFeedReload} />
                        ))}
                    </>
                )}

                {allPosts.length > 0 && loadedPostsCount < totalCount && loading && (
                    <FeedSkeleton count={1} />
                )}

                {allPosts.length > 0 && loadedPostsCount < totalCount && !loading && (
                    <Box className="feed-load-more">
                        <Button className={`feed-load-more-btn ${className}`} onClick={loadMorePosts}>
                            Cargar más publicaciones
                        </Button>
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
