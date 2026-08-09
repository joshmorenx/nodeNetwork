import PropTypes from 'prop-types';
import { Box, Skeleton } from "@mui/material";
import { useSelector } from 'react-redux';

export default function CommentSkeleton({ count = 1, showReactions = true }) {
    const className = useSelector((state) => state.className);
    const isDark = className === 'bgx-black';
    const skeletonColor = isDark ? '#2a2a34' : '#e5e7eb';

    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box key={index} className={`${className} feed-comment feed-skeleton-card`}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: skeletonColor }} />
                            <Skeleton variant="text" width={90} height={16} sx={{ bgcolor: skeletonColor }} />
                        </Box>
                        <Skeleton variant="rounded" width={80} height={22} sx={{ bgcolor: skeletonColor }} />
                    </Box>

                    <Box sx={{ my: '12px' }}>
                        <Skeleton variant="text" height={14} sx={{ bgcolor: skeletonColor }} />
                        <Skeleton variant="text" width="75%" height={14} sx={{ bgcolor: skeletonColor }} />
                    </Box>

                    {showReactions && (
                        <Box className="feed-comment-actions">
                            <Skeleton variant="rounded" width={110} height={34} sx={{ bgcolor: skeletonColor }} />
                            <Skeleton variant="rounded" width={130} height={34} sx={{ bgcolor: skeletonColor }} />
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
}

CommentSkeleton.propTypes = {
    count: PropTypes.number,
    showReactions: PropTypes.bool
};
