import PropTypes from 'prop-types'
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Box } from '@mui/material';

export default function Feed ({ token }) {
    try {
        const navigate = useNavigate()
        if(token) {
            const gotoDashboard = () => {
                navigate('/dashboard')
            }
        
            return (
                <Box>
                    <Button onClick={ gotoDashboard } variant="contained" color="primary">
                        <SettingsIcon></SettingsIcon>
                    </Button>
                </Box>                
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