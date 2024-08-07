import { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import useFollowUser from '../hooks/useFollowUser';
import useUnfollowUser from '../hooks/useUnfollowUser';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export default function FollowsButton({ token, username }) {
    const [abletoUnfollow, setAbletoUnfollow] = useState(false)
    const { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess } = useFollowUser({ token, username });
    const { sendUnfollowRequest, er, msj, suc } = useUnfollowUser({ token, username });
    const { user } = useGetCurrentUser({ token });

    useEffect(() => {
        checkFollowAlreadyExists();
    }, [])

    const follow = async () => {
        await sendFollowRequest()
        await checkFollowAlreadyExists()
    }

    const unfollow = async () => {
        await sendUnfollowRequest()
        await checkFollowAlreadyExists()
    }

    return (
        <>
            {user.username !== username ?
                <Box>
                    {/* { isFollowing && <Button className="already-following" variant="contained" color="success"></Button> } */}
                    {!isFollowing && <Button className="follow" variant="contained" onClick={() => follow(username)}> Seguir a {username} </Button>}

                    {isFollowing &&
                        <Button
                            variant="contained"
                            color="success"

                            onMouseOver={(event) => {
                                event.target.style.backgroundColor = 'rgb(200, 40, 30)'
                                event.target.innerText = 'Dejar de seguir a ' + username
                                setAbletoUnfollow(true)
                            }}

                            onMouseOut={(event) => {
                                event.target.style.backgroundColor = 'rgb(46, 125, 50)'
                                event.target.innerText = 'Ya sigues a ' + username
                                setAbletoUnfollow(false)
                            }}
                            onClick={abletoUnfollow ? unfollow : null}
                        > Ya sigues a {username}

                        </Button>
                    }
                </Box> : <Button variant='contained' disabled> No puedes seguirte a ti mismo </Button>
            }
        </>
    )
}