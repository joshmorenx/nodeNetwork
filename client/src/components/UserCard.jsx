import PropTypes from 'prop-types';

export default function UserCard({ user, allAccess, cadena }) {
    // const profilePicture = user.profilePicture // must make it work it throws an error not allowing to use it
    return (
        <div style={{ position: 'relative' }} className="m-auto">
            <div className='profile-card m-auto rounded-3xl bg-gray-200'>
                {/* Hola, Bienvenido {user.username} */}
                <div className="avatar-container rounded-3xl">
                    {/* <img className="avatar m-auto" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img> */}
                    {/* must erase the previous created users in order to initially create their profile picture and gallery pictures folders*/}
                    <img className="avatar m-auto" src={ user.username && `http://localhost:3000/api/public/uploads/users/${user.username}/profile/profile.jpg`}></img>
                    {/* `http://localhost:3000/api/public/uploads/users/${user.username}/profile/profile.jpg` must fetch with axios */}
                </div>

                <div className='user-data'>
                    <p>{user.firstName} {user.lastName}</p>
                    <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
                </div>

                {allAccess ?
                    (
                    <div className="user-type bg-blue-500 text-white font-bold py-1 px-2 border-blue-700 rounded">
                        <b>{ cadena ? ("Administrador"):(1) }</b>
                    </div>
                    ):(
                        <p>Sin permisos de administrador</p>)}
            </div>
            
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    allAccess: PropTypes.bool.isRequired,
    cadena: PropTypes.string.isRequired
}