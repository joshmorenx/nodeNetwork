import FeedNavbar from '../components/FeedNavbar';
import FeedContent from '../components/FeedContent';
import PropTypes from 'prop-types'
import { Box } from '@mui/material';

export default function Feed({ token }) {
    try {
        return (
            ({ token } &&
                <>
                    <Box>
                        <FeedNavbar token={token} />
                    </Box>
                    <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'plum', pt: '9px' }}>
                        
                        {/* Contenedor para los elementos fijos (Eventos) */}
                        <Box sx={{ position: 'fixed', top: '73px', left: '0', width: '20%', height: '100%' }}>
                            <Box className='bg-pink-500' style={{ width: '100%', height: '100%', marginBottom: '10px' }}>
                                <p>Eventos</p>
                            </Box>
                        </Box>

                        {/* Contenedor para el contenido del feed */}
                        <Box sx={{ marginLeft: '22%', marginRight: '22%' }}>
                            <FeedContent token={token} />
                        </Box>

                        {/* Contenedor para los elementos fijos (Trends) */}
                        <Box sx={{ position: 'fixed', top: '73px', right: '0', width: '20%', height: '100%' }}>
                            <Box className='bg-red-500' style={{ width: '100%', height: '100%', marginBottom: '10px' }}>
                                <p>Trends</p>
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