import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import useGetProfileImage from '../hooks/useGetProfileImage.jsx';

export default function UserAvatar({ user }) {
    const { image, imageError } = useGetProfileImage({ id: user.username });

    return (
        <Avatar className="feed-avatar">
            {image && !imageError
                ? <img src={image} alt={`Foto de perfil de ${user.username}`} />
                : user.username.charAt(0).toUpperCase()}
        </Avatar>
    )
}

UserAvatar.propTypes = {
    user: PropTypes.object.isRequired
};
