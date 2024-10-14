import Navbar from '../components/Navbar';
import FeedContent from '../components/FeedContent';
import PropTypes from 'prop-types'
import { Avatar, Box, Typography, Link, Stack } from '@mui/material';
import useGetAllUsers from '../hooks/useGetAllUsers';
import { useEffect, useState } from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import '../assets/styles.css';
import { Helmet } from 'react-helmet';

export default function Feed({ token }) {
    const className = useSelector((state) => state.className);
    const { userNames } = useGetAllUsers();
    const [nombres, setNombres] = useState([]);
    const { user } = useGetCurrentUser({ token });
    const usernameLinkStyles = [
        { gap: '10px', mt: '10px', ml: '10px', display: 'flex', justifyContent: 'left', alignItems: 'center', textDecoration: 'none', cursor: 'pointer', ":hover": { textDecoration: 'underline' } },
        { color: className === 'bgx-black' ? 'white' : 'black' }
    ]
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const leftSectionStyles = {
        position: 'fixed',
        top: '102px',
        left: '0',
        width: '20%',
        pl: '10px',
    }

    const rightSectionStyles = {
        position: 'fixed',
        top: '102px',
        right: '0',
        width: '20%',
        pr: '10px',
    }

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
                    <Helmet>
                        <title>Feed - Node Network</title>
                    </Helmet>
                    <Navbar token={token} />
                    
                    <Box className={className === 'bgx-black' ? 'bgx-black-semi' : 'bgx-white-semi'} sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, bgcolor: '#00000099' }} />

                    <Box sx={{ position: 'relative', width: '100%', height: '100%', pt: '9px' }}>

                        {/* Contenedor para los elementos fijos (Eventos) */}
                        <Box className={isDesktop && 'slideInLeft'} visibility={isDesktop ? 'visible' : 'hidden'} sx={leftSectionStyles}>
                            <Box className={className} style={{ width: '100%', height: '100%', padding: '40px', borderRadius: '10px', boxShadow: '0px 5px 5px black' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Stack direction="row" spacing={2}>
                                        {user.username ? (
                                            <Link href={`/profile/${user.username}`} sx={usernameLinkStyles[0]}>
                                                <Avatar> {user.username.charAt(0).toUpperCase()}</Avatar>
                                                <Typography sx={usernameLinkStyles[1]}>{user.username}</Typography>
                                            </Link>
                                        ) : (<></>)}
                                    </Stack>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '10px' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Link href={`/follows/${user.username}#followers`} sx={usernameLinkStyles[0]}>
                                            <ThreePIcon sx={usernameLinkStyles[1]} />
                                            <Typography sx={usernameLinkStyles[1]}>Seguidores</Typography>
                                        </Link>
                                    </Stack>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '10px' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Link href={`/follows/${user.username}#following`} sx={usernameLinkStyles[0]}>
                                            <HowToRegIcon sx={usernameLinkStyles[1]} />
                                            <Typography sx={usernameLinkStyles[1]}>Siguiendo</Typography>
                                        </Link>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        {/* Contenedor para el contenido del feed */}
                        <Box className={'fadeIn'} sx={isDesktop ? { marginLeft: '22%', marginRight: '22%' } : isTablet ? { marginLeft: '5%', marginRight: '5%' } : { marginLeft: '0%', marginRight: '0%' }}>
                            <FeedContent token={token} />
                        </Box>

                        {/* Contenedor para los elementos fijos (usuarios mas recientes) */}
                        <Box className={isDesktop && 'slideInRight'} visibility={isDesktop ? 'visible' : 'hidden'} sx={rightSectionStyles}>
                            <Box className={className} style={{ width: '100%', height: '100%', padding: '40px', borderRadius: '10px', boxShadow: '0px 5px 5px black' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1.3vw', color: className === 'bgx-black' ? 'white' : 'black', mt: '10px' }}>Usuarios recien registrados</Typography>
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