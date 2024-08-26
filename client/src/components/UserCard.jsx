import PropTypes from 'prop-types';
import { Typography, useMediaQuery, Link } from "@mui/material";
import { useSelector } from 'react-redux';

export default function UserCard({ user, allAccess, cadena, handleImageClicked }) {
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

    const handleImageClick = (event) => {
        handleImageClicked(event)
    }

    return (
        <>
            <div style={{ position: 'relative' }} className="m-auto">
                <div className={className+' profile-card m-auto rounded-2xl bg-gray-200'}>

                    <div className="avatar-container rounded-2xl">
                        <img style={isDesktop || isTablet ? {} : { width: '50vw', height: '50vw' }} onClick={(event) => { handleImageClick(event) }} className="avatar m-auto cursor-pointer" src={`https://nodenetwork-backend.onrender.com${user.profilePicture}`}></img>
                    </div>

                    <div className='user-data'>
                        <strong>{user.username ? (user.username).toUpperCase() : <></>}</strong>
                        <p>{user.firstName} {user.lastName}</p>
                        {/* <p><a href={`mailto:${user.email}`}>{user.email}</a></p> */}
                        <Typography sx={{ fontSize: isDesktop ? '1vw' : isTablet ? '1.5vw' : '5vw' }}><Link href={`mailto:${user.email}`}>{user.email}</Link></Typography>
                    </div>

                    {allAccess ?
                        (
                            <div className="user-type bg-blue-500 text-white font-bold py-1 px-2 border-blue-700 rounded">
                                <b>{cadena && ("Administrador")}</b>
                            </div>
                        ) : (
                            <p>Sin permisos de administrador</p>)}
                </div>

            </div>
        </>
    )
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    allAccess: PropTypes.bool.isRequired,
    cadena: PropTypes.string.isRequired,
    handleImageClicked: PropTypes.func
}