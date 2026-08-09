import PropTypes from 'prop-types';
import { Avatar, Box, Link, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import useGetProfileImage from '../hooks/useGetProfileImage';
import FollowsButton from './FollowsButton.jsx';

export default function RecentUser({ username, token, currentUsername }) {
    const className = useSelector((state) => state.className);
    const { image } = useGetProfileImage({ id: username });

    return (
        <Box className={`feed-sidebar-user-row ${className}`}>
            <Link href={`/profile/${username}/`} className="feed-sidebar-user">
                <Avatar className="feed-avatar" sx={{ width: 38, height: 38 }}>
                    {image ? <img src={image} alt={username} /> : (username ? username.charAt(0).toUpperCase() : '')}
                </Avatar>
                <Typography noWrap sx={{ fontSize: '14px', fontWeight: 600 }}>{username}</Typography>
            </Link>
            <FollowsButton token={token} username={username} currentUsername={currentUsername} />
        </Box>
    );
}

RecentUser.propTypes = {
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    currentUsername: PropTypes.string
};
