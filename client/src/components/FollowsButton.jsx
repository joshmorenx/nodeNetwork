import { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import useFollowUser from '../hooks/useFollowUser';
import useUnfollowUser from '../hooks/useUnfollowUser';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { CircularProgress } from '@mui/material';

export default function FollowsButton({ token, username, currentUsername }) {
    const [abletoUnfollow, setAbletoUnfollow] = useState(false)
    const { sendFollowRequest, checkFollowAlreadyExists, isFollowing, followMsg, followError, followSuccess, loading } = useFollowUser({ token, username });
    const { sendUnfollowRequest, er, msj, suc } = useUnfollowUser({ token, username });
    const { user } = useGetCurrentUser({ token });
    const effectiveUsername = currentUsername || user.username;

    useEffect(() => {
        checkFollowAlreadyExists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {!effectiveUsername ? <CircularProgress /> : effectiveUsername === username ? null :
                <Box>
                    {/* { isFollowing && <Button className="already-following" variant="contained" color="success"></Button> } */}
                    {!isFollowing && <Button className="follow-btn" variant="contained" onClick={() => follow(username)}> Seguir </Button>}

                    {isFollowing &&
                        <Button
                            className="follow-btn-active"
                            variant="contained"
                            color="success"

                            onMouseOver={(event) => {
                                event.target.style.backgroundColor = 'rgb(200, 40, 30)'
                                event.target.innerText = 'No seguir'
                                setAbletoUnfollow(true)
                            }}

                            onMouseOut={(event) => {
                                event.target.style.backgroundColor = 'rgb(46, 125, 50)'
                                event.target.innerText = 'Siguiendo'
                                setAbletoUnfollow(false)
                            }}
                            onClick={abletoUnfollow ? unfollow : null}
                        > Siguiendo </Button>
                    }
                </Box>
            }
        </>
    )
}

FollowsButton.propTypes = {
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    currentUsername: PropTypes.string
};