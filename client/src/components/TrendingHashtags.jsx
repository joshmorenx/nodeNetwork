import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useGetTrendingHashtags from '../hooks/useGetTrendingHashtags.jsx';
import { useSelector } from 'react-redux';

export default function TrendingHashtags({ token }) {
    const className = useSelector((state) => state.className);
    const { hashtags, sendRequest } = useGetTrendingHashtags({ token });

    useEffect(() => {
        sendRequest();
    }, []);

    const linkStyles = {
        gap: '10px',
        mt: '10px',
        ml: '10px',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        textDecoration: 'none',
        cursor: 'pointer',
        ":hover": { textDecoration: 'underline' },
        color: className === 'bgx-black' ? 'white' : 'black',
    };

    return (
        <Box className={`feed-sidebar ${className}`} style={{ width: '100%', height: '100%', padding: '15px', marginTop: '15px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography className="feed-sidebar-title" sx={{ fontSize: '1.3vw', mt: '0' }}>Tendencias</Typography>
            </Box>
            {hashtags.length === 0 ? (
                <Typography className="feed-sidebar-link" sx={linkStyles}>No hay tendencias todavía</Typography>
            ) : (
                <Stack>
                    {hashtags.map((hashtag, index) => (
                        <Link key={index} component={RouterLink} to={`/search/${encodeURIComponent(hashtag.tag)}`} className="feed-sidebar-link" sx={linkStyles}>
                            <Typography sx={linkStyles}>{hashtag.tag}</Typography>
                        </Link>
                    ))}
                </Stack>
            )}
        </Box>
    );
}

TrendingHashtags.propTypes = {
    token: PropTypes.string,
};
