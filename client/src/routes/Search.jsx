import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import useSearchUsers from "../hooks/useSearchUsers";
import UsersSearchResults from "../components/UsersSearchResults";
import { Box } from "@mui/material";
import FeedContent from "../components/FeedContent";
import { Helmet } from "react-helmet";

export default function Search({ token }) {
    const { query } = useParams();
    const { user, error } = useGetCurrentUser({ token });
    const { users, loading, sendRequest } = useSearchUsers({ token });

    useEffect(() => {
        if (query) {
            sendRequest(query);
        }
    }, [query]);

    return(
        <>
            <Helmet>
                <title>Search - Node Network</title>
            </Helmet>
            <Navbar token={token} />;
            <Box sx={{ width: '80vw', display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
                {query && <UsersSearchResults users={users} loading={loading} />}
                <FeedContent token={token} query={query} />
            </Box>
        </>
    )
}