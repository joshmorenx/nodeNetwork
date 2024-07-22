import Navbar from '../components/Navbar';
import FeedContent from '../components/FeedContent';
import PropTypes from 'prop-types'
import { Avatar, Box, Typography, Link, Stack } from '@mui/material';
import useGetAllUsers from '../hooks/useGetAllUsers';
import { useEffect, useState } from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export default function Feed({ token }) {
    const { userNames } = useGetAllUsers();
    const [nombres, setNombres] = useState([]);
    const { user } = useGetCurrentUser({ token });
    const usernameLinkStyles = [
        { mt: '10px', ml: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center', textDecoration: 'none', cursor: 'pointer', ":hover": { textDecoration: 'underline' } },
        { color: 'white', mt: '10px', ml: '10px' }
    ]

    useEffect(() => {
        try {
            if (userNames) {
                const userIds = userNames.map(user => user.id);
                const top4Ids = userIds.sort((a, b) => b - a).slice(0, 4);
                const top4Users = userNames.filter(user => top4Ids.includes(user.id));
                const top4Names = top4Users.map(tp => tp.username);

                setNombres(top4Names)
            } else {
                console.log("No hay usuarios");
            }
        } catch (error) {
            // console.log(error);
        }
    }, [userNames])

    try {
        return (
            ({ token } &&
                <>
                    <Box>
                        <Navbar token={token} />
                    </Box>
                    <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'plum', pt: '9px' }}>

                        {/* Contenedor para los elementos fijos (Eventos) */}
                        <Box sx={{ position: 'fixed', top: '73px', left: '0', width: '20%', height: '100%' }}>
                            <Box className='bg-red-500' style={{ width: '100%', height: '100%', marginBottom: '10px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'justify', alignItems: 'center', pt: '10px' }}>
                                    <Stack direction="row" spacing={2}>
                                        {user.username ? (
                                            <Link href={`/profile/${user.username}`} sx={usernameLinkStyles[0]}>
                                                <Avatar> {user.username.charAt(0).toUpperCase()}</Avatar>
                                                <Typography sx={usernameLinkStyles[1]}>{user.username}</Typography>
                                            </Link>
                                        ) : (<></>)}
                                    </Stack>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'justify', alignItems: 'center', pt: '10px' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Link href={"#"} sx={usernameLinkStyles[0]}>
                                            <ThreePIcon sx={usernameLinkStyles[1]} />
                                            <Typography sx={usernameLinkStyles[1]}>Seguidores</Typography>
                                        </Link>
                                    </Stack>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'justify', alignItems: 'center', pt: '10px' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Link href={"#"} sx={usernameLinkStyles[0]}>
                                            <HowToRegIcon sx={usernameLinkStyles[1]} />
                                            <Typography sx={usernameLinkStyles[1]}>Usuarios seguidos</Typography>
                                        </Link>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        {/* Contenedor para el contenido del feed */}
                        <Box sx={{ marginLeft: '22%', marginRight: '22%' }}>
                            <FeedContent token={token} />
                        </Box>

                        {/* Contenedor para los elementos fijos (usuarios mas recientes) */}
                        <Box sx={{ position: 'fixed', top: '73px', right: '0', width: '20%', height: '100%' }}>
                            <Box className='bg-red-500' style={{ width: '100%', height: '100%', marginBottom: '10px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ color: 'white', mt: '10px' }}>Usuarios recien registrados</Typography>
                                </Box>
                                {
                                    nombres.map((nombre, index) => {
                                        return (
                                            <Link href={`/profile/${nombre}/`} key={index} sx={usernameLinkStyles[0]}>
                                                <Avatar>{nombre.charAt(0)}</Avatar><Typography sx={usernameLinkStyles[1]}>{nombre}</Typography>
                                            </Link>
                                        )
                                    })
                                }
                            </Box>
                        </Box>

                    </Box>

                </>)
        )
    } catch (error) {
        return (
            <h1>Oops, something went wrong</h1>
        )
    }
}

Feed.propTypes = {
    token: PropTypes.string,
};