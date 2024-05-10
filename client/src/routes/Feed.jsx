import FeedNavbar from '../components/FeedNavbar';
import FeedContent from '../components/FeedContent';
import PropTypes from 'prop-types'
import { Box } from '@mui/material';

export default function Feed ({ token }) {
    try {
        if(token) {

            return (
                <>
                    <FeedNavbar token={token}/>
                    <Box sx={{ position:'relative', width: '100%', height: '100%', bgcolor: 'plum', p: 10}}>
                        <FeedContent token={token} />
                    </Box>
                </>           
            )
        }
    } catch (error) {
        return (
            <h1>Oops, something went wrong</h1>
        )
    }
}

Feed.propTypes = {
    token: PropTypes.string,
};