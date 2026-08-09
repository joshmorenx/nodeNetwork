import PropTypes from 'prop-types';
import { Typography, Link } from "@mui/material";
import { useSelector } from 'react-redux';
import useGetProfileImage from '../hooks/useGetProfileImage';

export default function UserCard({ user, allAccess, cadena, handleImageClicked, id }) {
    const className = useSelector((state) => state.className);
    const { image, imageError } = useGetProfileImage({ id: user.username })
    const handleImageClick = (event) => {
        handleImageClicked(event)
    }

    return (
        <>
            <div style={{ position: 'relative' }} className="m-auto">
                <div className={className + ' profile-user-card m-auto'}>

                    <div className="avatar-container">
                        <img onClick={(event) => { handleImageClick(event) }} className="avatar m-auto cursor-pointer" src={image}></img>
                    </div>

                    <div className='user-data'>
                        <strong>{user.username ? (user.username).toUpperCase() : <></>}</strong>
                        <p>{user.firstName} {user.lastName}</p>
                        {/* <p><a href={`mailto:${user.email}`}>{user.email}</a></p> */}
                        <Typography><Link href={`mailto:${user.email}`}>{user.email}</Link></Typography>
                    </div>

                    {(allAccess || id === 1) ?
                        (
                            <div className="user-type">
                                <b>{cadena && ("Administrador")}</b>
                            </div>
                        ) : (
                            null)}
                </div>

            </div>
        </>
    )
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    allAccess: PropTypes.bool.isRequired,
    cadena: PropTypes.string.isRequired,
    handleImageClicked: PropTypes.func,
    id: PropTypes.number
}