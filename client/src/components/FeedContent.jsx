import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import PostedContent from './PostedContent.jsx';

export default function FeedContent({ token }) {

    return (
        <>
            <Box>
                <PostingBox token={token} />
                <PostedContent token={token} />
                <PostedContent token={token} />
                <PostedContent token={token} />
                <PostedContent token={token} />
                <PostedContent token={token} />
            </Box>
        </>
    )
}

FeedContent.propTypes = {
    token: PropTypes.string
}   
