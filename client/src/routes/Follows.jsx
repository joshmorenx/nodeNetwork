import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FollowContent from "../components/FollowContent";
// import useGetUserFollows from "../hooks/useGetUserFollows";

export default function Follows({ token }) {
    const { username } = useParams()
    return(
        <>
            <Navbar token={token} />
            <FollowContent token={token} username={username} />
        </>
    )
}