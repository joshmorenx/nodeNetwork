import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import { Box } from "@mui/material";
import useGetSearchResults from '../hooks/useGetSearchResults.jsx';

export default function Search({ token }) {
    const { query } = useParams();
    const { user, error } = useGetCurrentUser({ token });
    const { setLoading, sendQuery, searchResults, success, msg, errorQuery, loading } = useGetSearchResults({ token })

    useEffect(() => {
        if(query !== ''){
            setLoading(true)
            sendQuery(query)
            sendQuery()
        }
    }, [query])

    return(
        <>
            <Navbar token={token} />;
            <Box sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* <h1>{query}</h1> */}
                <h1>{msg}</h1>
            </Box>
        </>
    )
}