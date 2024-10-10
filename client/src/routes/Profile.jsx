import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import useGetSpecificUserData from "../hooks/useGetSpecificUserData.jsx";
import { Box } from "@mui/material";
import ProfileDisplayer from "../components/ProfileDisplayer.jsx";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function Profile({ token }) {
    const { username } = useParams();
    const { user, error } = useGetCurrentUser({ token });
    const { sendRequest, userData, success, err } = useGetSpecificUserData({ token, username });
    const [currentUsername, setCurrentUsername] = useState('');
    const [getSuccess, setGetSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const className = useSelector((state) => state.className);

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
            setLoading(false);
        }
    }, [success]);

    useEffect(() => {
        if (err) {
            setGetSuccess(false);
            setLoading(false);
        }
    }, [err]);

    return (
        <Box>
            <Helmet>
                <title>Profile - Node Network</title>
            </Helmet>
            <Navbar token={token} />
            { loading ? (<p>Cargando...</p>) : null }
            {getSuccess &&
                (<ProfileDisplayer token={token} username={username} currentUsername={user.username} />)
            }
            { err ? (<p className={className}>error al cargar el usuario o el usuario no existe</p>) : null }
        </Box>
    )
}