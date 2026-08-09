import PropTypes from 'prop-types';
import { Box, Skeleton } from "@mui/material";
import { useSelector } from 'react-redux';

export default function FeedSkeleton({ count = 3 }) {
    const className = useSelector((state) => state.className);
    const isDark = className === 'bgx-black';

    const skeletonColor = isDark ? '#2a2a34' : '#e5e7eb';

    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Box key={index} className={`${className} feed-post-card feed-skeleton-card`} sx={{ margin: '14px 0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: skeletonColor }} />
                        <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="35%" height={18} sx={{ bgcolor: skeletonColor }} />
                            <Skeleton variant="text" width="20%" height={14} sx={{ bgcolor: skeletonColor }} />
                        </Box>
                    </Box>

                    <Box sx={{ mt: '16px' }}>
                        <Skeleton variant="text" height={16} sx={{ bgcolor: skeletonColor }} />
                        <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: skeletonColor }} />
                    </Box>

                    <Skeleton variant="rounded" height={140} sx={{ mt: '16px', bgcolor: skeletonColor }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '8px', mt: '16px' }}>
                        <Skeleton variant="rounded" width="30%" height={38} sx={{ bgcolor: skeletonColor }} />
                        <Skeleton variant="rounded" width="34%" height={38} sx={{ bgcolor: skeletonColor }} />
                        <Skeleton variant="rounded" width="32%" height={38} sx={{ bgcolor: skeletonColor }} />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

FeedSkeleton.propTypes = {
    count: PropTypes.number
};
