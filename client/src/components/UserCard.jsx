import PropTypes from 'prop-types';

export default function UserCard({ user, allAccess, cadena, handleImageClicked }) {

    const handleImageClick = (event) => {
        handleImageClicked(event)
    }

    return (
        <>
            <div style={{ position: 'relative' }} className="m-auto">
                <div className='profile-card m-auto rounded-2xl bg-gray-200'>

                    <div className="avatar-container rounded-2xl">
                        <img onClick={(event) => { handleImageClick(event) }} className="avatar m-auto cursor-pointer" src={`http://localhost:3000${user.profilePicture}`}></img>
                    </div>

                    <div className='user-data'>
                        <strong>{user.username ? (user.username).toUpperCase() : <></>}</strong>
                        <p>{user.firstName} {user.lastName}</p>
                        <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
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