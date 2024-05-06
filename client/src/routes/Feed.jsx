import PropTypes from 'prop-types'
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

export default function Feed ({ token }) {
    try {
        const navigate = useNavigate()
        if(token) {
            const gotoDashboard = () => {
                navigate('/dashboard')
            }
        
            return (
                <Button onClick={ gotoDashboard } variant="contained" color="primary">
                    <SettingsIcon></SettingsIcon>
                </Button>
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