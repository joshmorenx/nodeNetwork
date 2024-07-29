import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import FollowContent from "../components/FollowContent";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
// import useGetUserFollows from "../hooks/useGetUserFollows";

export default function Follows({ token }) {
    const { username } = useParams()
    const { user, error } = useGetCurrentUser({ token });
    const navigate = useNavigate()

    useEffect(() => {
        if (user.username && !username) {
            navigate(`/follows/${user.username}`)
        }
    }, [username, user.username])
    return (
        <>
            <Navbar token={token} />
            <FollowContent token={token} username={username && username} />
        </>
    )
}