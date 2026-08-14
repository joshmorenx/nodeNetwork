import PropTypes from 'prop-types';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import UserAvatar from './UserAvatar.jsx';

export default function UsersSearchResults({ users, loading }) {
    const className = useSelector((state) => state.className);
    const linkColor = className === 'bgx-black' ? 'white' : 'black';

    return (
        <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
            <Typography className="feed-sidebar-title" variant="h6" sx={{ mb: 1 }}>
                Usuarios
            </Typography>

            {loading && users.length === 0 && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && users.length === 0 && (
                <Typography className="feed-empty-message" variant="body1">
                    No se encontraron usuarios
                </Typography>
            )}

            {users.length > 0 && (
                <Box>
                    {users.map((user) => (
                        <Link
                            href={`/profile/${user.username}`}
                            key={user.username}
                            className="feed-sidebar-link"
                            sx={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', py: 1, px: 1, width: 'fit-content' }}
                        >
                            <UserAvatar user={user} />
                            <Box>
                                <Typography sx={{ fontWeight: 600, color: linkColor }}>
                                    {user.username}
                                </Typography>
                                {user.firstName && (
                                    <Typography variant="body2" sx={{ color: '#9c8fc0' }}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                )}
                            </Box>
                        </Link>
                    ))}
                </Box>
            )}
        </Box>
    )
}

UsersSearchResults.propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool
};
