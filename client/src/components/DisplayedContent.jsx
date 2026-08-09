import { Button, Box, Typography, Link } from '@mui/material';
import FollowsButton from './FollowsButton.jsx';
import { useSelector } from "react-redux";

export default function DisplayedContent({ token, username, following, followers, selectedTab }) {
    const className = useSelector((state) => state.className);

    return (
        <>
            {selectedTab == 0 && <Typography className="follow-list-empty"> Selecciona una pestaña para ver sus contenidos. </Typography>}

            <Box className="follow-list">

                {selectedTab == 1 &&
                    <Box sx={{ display: 'block' }}>
                        <Typography className="follow-list-title">Seguidores</Typography>
                        {followers.length === 0 && <Typography className="follow-list-empty">Aún no tienes seguidores.</Typography>}
                        {followers.map((follower, key) => (
                            <Box className={`${className} follow-list-item`} key={key}>
                                <Link className="follow-list-name" href={`/profile/${follower.username}`}> {follower.username} </Link>
                                <Button className="follow-list-badge" size="small" disabled>
                                    Seguidor
                                </Button>
                            </Box>
                        ))}
                    </Box>
                }

                {selectedTab == 2 &&
                    <Box sx={{ display: 'block' }}>
                        <Typography className="follow-list-title">Siguiendo</Typography>
                        {following.length === 0 && <Typography className="follow-list-empty">Aún no sigues a nadie.</Typography>}
                        {following.map((following, key) => (
                            <Box className={`${className} follow-list-item`} key={key}>
                                <Link className="follow-list-name" href={`/profile/${following.username}`}> {following.username} </Link>
                                <FollowsButton token={token} username={following.username} />
                            </Box>
                        ))}
                    </Box>
                }

            </Box>
        </>
    )
}