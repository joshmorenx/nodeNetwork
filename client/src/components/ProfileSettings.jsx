import PropTypes from 'prop-types'
import { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import useGetCurrentUser from '../hooks/useGetCurrentUser'
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileSettings({ token }) {

    const { user, error } = useGetCurrentUser({ token });

    return (
        <>  
            <div className="avatar-container rounded-3xl">
                <a href=""></a><img className="avatar m-auto" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"></img>
            </div>
            
            <div>
                <p>Nombre de usuario</p>
                <TextField
                    disabled
                    autoFocus={true}
                    size='small'
                    type="text"
                    id="username"
                    name="username"
                    // value={user && user.username} need to control the value
                    required
                />
                <EditIcon></EditIcon>
                {/* mui pencil icon */}
            </div>
        </>
    )
}

ProfileSettings.propTypes = {
    token: PropTypes.string
}