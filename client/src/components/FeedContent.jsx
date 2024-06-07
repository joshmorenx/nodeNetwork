import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';

export default function FeedContent({ token }) {
    const variousPosts = () => {
        return Array.from({ length: 10 }).map((_, index) => (
            <PostedContent key={index} token={token} />
        ));
    }

    return (
        <>
            <Box>
                <PostingBox token={token} />
                { variousPosts() }
            </Box>
        </>
    )
}

FeedContent.propTypes = {
    token: PropTypes.string
}   
