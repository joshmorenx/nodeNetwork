import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useLogout from '../hooks/useLogout';
import useGetUser from '../hooks/useGetUser';
import usePermissions from '../hooks/usePermissions';
import PermissionAssigner from '../routes/PermissionAssigner';
// import { useNavigate } from 'react-router';

const Dashboard = ({ token }) => {
    // let navigate = useNavigate();    
    useEffect(() => {
        // console.log('Token:', token);
    }, [token]);

    // const logout = useLogout();
    const { logout, logStatusRefresh } = useLogout(token);

    if(logStatusRefresh){
        window.location.reload();
    }
    const { user, error } = useGetUser({ token });
    // let hasAdminPermissions = false
    const handleLogout = () => {
        logout()
    };
    
    let { cadena, allAccess } = usePermissions(user)
    // console.log(cadena);

    const showClickedContent = (event) => {
        const index = Array.from(event.currentTarget.parentNode.children).indexOf(event.currentTarget);
        const contentContainer = document.querySelector('.content-container');
        for(let elem in contentContainer.children){
            try {
                if(index == elem){
                    contentContainer.children[elem].classList.remove('hidden');
                }else{
                    contentContainer.children[elem].classList.add('hidden');
                }
            } catch (error) {
                //console.log(error);
            }
        }
    }

    return (
        <>
            <div className="dashboard-container" style={{ paddingRight: '2vw' }}>
                <div className="profile-container text-center">
                    {error ? (
                        <p>Error al obtener el contenido del usuario: {error.message}</p>
                    ) : (
                            <div className="m-auto">
                                <div className='profile-card m-auto rounded-3xl bg-gray-200'>
                                    {/* Hola, Bienvenido {user.username} */}
                                    <div className="avatar-container rounded-3xl">
                                        <img className="avatar m-auto" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
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
                    )}
                        <button className='logout-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-2 border-blue-700 rounded' onClick={handleLogout}>Cerrar Sesión</button>

                        <div className='sections-container mt-5'>
                            <div onClick={showClickedContent} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Feed </div>
                            {allAccess ? (<div onClick={showClickedContent} className='bg-blue-500 mt-1 text-white cursor-pointer text-base'> Asignador de permisos </div>):(<p></p>) }
                        </div>
                </div>

                <div className="content-container">

                    <div className='feed-container hidden' id='feed-container'>
                        <p>Feed</p>
                    </div>

                    {allAccess ? (
                        <div className='permission-container hidden' id='permission-container'>
                            <PermissionAssigner token={token} />
                        </div>
                    ) : (
                        <p></p>
                    )}                    
                    
                    
                </div>

            </div>
        </> 
    );
};

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;
