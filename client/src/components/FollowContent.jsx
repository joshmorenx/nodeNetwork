import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Stack, Box, Typography } from '@mui/material';
import useFollowUser from '../hooks/useFollowUser';
import useUnfollowUser from '../hooks/useUnfollowUser';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import useGetFollows from '../hooks/useGetFollows.jsx'
import FollowTabs from './FollowTabs.jsx'
import DisplayedContent from './DisplayedContent.jsx'
import { useLocation } from 'react-router-dom';

export default function FollowContent({ token, username }) {
    const { user, error } = useGetCurrentUser({ token });
    const { messageFollows, successFollows, errorFollows, followers, following, getFollows } = useGetFollows({ token })
    const [selectedTab, setSelectedTab] = useState(0)
    const location = useLocation()

    const handleSelectedTab = (selectedTab) => {
        setSelectedTab(selectedTab)
    }

    useEffect(() => {
        if (username) {
            getFollows(username) //needs a rework
        }
    }, [username])

    useEffect(()=>{
        const hash = location.hash
        if(hash === '#followers'){
            setSelectedTab(1)
        } else if(hash === '#following'){
            setSelectedTab(2)
        }
    }, [location])

    return (
        <Box sx={{ width: '100%' }}>
            <FollowTabs handleSelectedTab={handleSelectedTab} selectedTab={selectedTab} />
            <DisplayedContent token={token} following={following} followers={followers} username={username} selectedTab={selectedTab} />
        </Box>
    )
}