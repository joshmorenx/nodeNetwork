import FeedNavbar from '../components/FeedNavbar';
import FeedContent from '../components/FeedContent';
import PropTypes from 'prop-types'
import { Box } from '@mui/material';

export default function Feed ({ token }) {
    try {
        return (
                ({token} &&
                    <>
                    <FeedNavbar token={token}/>
                    <Box sx={{ position:'relative', width: '100%', height: '100%', bgcolor: 'plum', pt: '9px'}}>
                        <Box className='inline-flex'>
                            <Box className='bg-pink-500' style={{width: '70%', marginRight: '10px'}}>
                                <p>Feed</p>
                            </Box>
                                <FeedContent token={token} />
                            <Box className='bg-red-500' style={{width: '70%', marginLeft: '10px'}}>
                                <p>Feed</p>
                            </Box>
                        </Box>
                    </Box>
                    </>)
        )
    } catch (error) {
        return (
            <h1>Oops, something went wrong</h1>
        )
    }
}

Feed.propTypes = {
    token: PropTypes.string,
};