import FeedNavbar from "../components/FeedNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box } from "@mui/material";


export default function Profile({ token }) {
    const { username } = useParams();
    const { user, error } = useGetCurrentUser({ token });
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const [currentUsername, setCurrentUsername] = useState('');
    const [getSuccess, setGetSuccess] = useState(false);

    useEffect(() => {
        if (user.username) {
            setCurrentUsername(user.username);
        }
    }, [user.username])

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        if (currentUsername && !username) {
            window.location.href = '/profile/' + currentUsername;
        }
    }, [currentUsername, username]);

    useEffect(() => {
        if (success) {
            setGetSuccess(true);
        }
    }, [success]);

    return (
        <>
            <FeedNavbar token={token} />
            {getSuccess ?
                (<Box>
                    <Box>{userData.username}</Box>
                    <Box>{userData.firstName}</Box>
                    <Box>{userData.lastName}</Box>
                    <Box>{userData.email}</Box>
                    <Box>
                        <img src={`http://localhost:3000${userData.profilePicture}`} alt="profile picture" />
                    </Box>
                </Box>):
                ( <p>El usuario no existe</p> )
            }

        </>
    )
}