import PropTypes from 'prop-types';
import { Box, Link, Typography } from "@mui/material";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const extractHashtags = (posts) => {
    const counts = {};
    (posts || []).forEach(post => {
        const content = post.content || '';
        const matches = content.match(/#[\p{L}\p{N}_]+/gu);
        if (matches) {
            matches.forEach(tag => {
                const key = tag.toLowerCase();
                counts[key] = counts[key] || { tag, count: 0 };
                counts[key].count += 1;
            });
        }
    });
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 6);
};

export default function TrendingPanel({ posts }) {
    const className = useSelector((state) => state.className);
    const trending = useMemo(() => extractHashtags(posts), [posts]);

    if (trending.length === 0) return null;

    return (
        <Box className={`feed-sidebar-card ${className}`}>
            <Box className="feed-trending-head">
                <TrendingUpIcon className="feed-trending-icon" />
                <Typography className="feed-sidebar-title">Tendencias</Typography>
            </Box>
            <Box className="feed-trending-list">
                {trending.map(({ tag, count }, index) => (
                    <Link
                        key={tag}
                        href={`/search/${encodeURIComponent(tag)}`}
                        className={`feed-trending-item ${className}`}
                    >
                        <Box className="feed-trending-rank">#{index + 1}</Box>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography noWrap className="feed-trending-tag">{tag}</Typography>
                            <Typography className="feed-trending-count">{count} publicación{count !== 1 ? 'es' : ''}</Typography>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

TrendingPanel.propTypes = {
    posts: PropTypes.array
};
