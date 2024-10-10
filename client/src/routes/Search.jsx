import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { Box } from "@mui/material";
import FeedContent from "../components/FeedContent";
import { Helmet } from "react-helmet";

export default function Search({ token }) {
    const { query } = useParams();
    const { user, error } = useGetCurrentUser({ token });

    return(
        <>
            <Helmet>
                <title>Search - Node Network</title>
            </Helmet>
            <Navbar token={token} />;
            <Box sx={{ width: '80vw', display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
                <FeedContent token={token} query={query} />
            </Box>
        </>
    )
}