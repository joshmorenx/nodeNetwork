import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import useUpdateProfile from '../hooks/useUpdateProfile';
import ProfileEditPicture from './ProfileEditPicture.jsx';
import ProfileEditNames from './ProfileEditNames.jsx';
import ProfileEditEmail from './ProfileEditEmail.jsx';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import useGetProfleImage from '../hooks/useGetProfileImage.jsx'

export default function ProfileSettings({ token }) {
    const className = useSelector((state) => state.className);
    const navigate = useNavigate();
    const [noEditFirstName, setNoEditFirstName] = useState(true);
    const [noEditLastName, setNoEditLastName] = useState(true);
    // const [noEditUsername, setNoEditUsername] = useState(true);
    const [noEditEmail, setNoEditEmail] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); // Default image file
    const [selectedImageUrl, setSelectedImageUrl] = useState(null); // Default image URL
    const { user } = useGetCurrentUser({ token });
    const { image, imageError } = useGetProfleImage({ id: user.username })

    const { formUserData, error, success, msg, handleInputChange, sendRequest, newToken } = useUpdateProfile({
        token, initialForm: {
            firstName: '',
            lastName: '',
            email: ''
        }
    })
    
    if(newToken){
        Cookies.remove('token')
        Cookies.set('token', newToken, { expires: 7, secure: true, sameSite: 'Strict' });
        // window.location.reload();
        navigate(0)
    }

    useEffect(() => {
        if (user && user.profilePicture) {
            setSelectedImageUrl(image)
        }
    }, [user, image]);

    const handleEdit = (section, editNum) => {
        const result = window.confirm(`¿Seguro que quieres editar ${section}?`);
        if (editNum === 1) {
            if (result) {
                setNoEditFirstName(false);
            }
        }
        else if (editNum === 2) {
            if (result) {
                setNoEditLastName(false);
            }
        }
        // else if (editNum === 3) {
        //     if (result) {
        //         setNoEditUsername(false);
        //     }
        // }
        else if (editNum === 4) { //do not change editNum to 3
            if (result) {
                setNoEditEmail(false);
            }
        }
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
        setSelectedImageUrl(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <>
            <Accordion className={className} sx={{ overflowY: 'auto', height: '98%', bgcolor: '#f9f0ce' }} expanded={true} color='primary'>
                <AccordionSummary
                    // expandIcon={<ArrowDropDownIcon />}
                    className={className}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    sx={{ mt: 1, bgcolor: '#f9f0ce', cursor: 'default!important' }}
                >
                    <Typography>Modificar detalles de perfil</Typography>
                </AccordionSummary>
                <AccordionDetails className={className} sx={{ bgcolor: '#faf1de' }}>
                    <Box className="avatar-container" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <ProfileEditPicture selectedImage={selectedImage} selectedImageUrl={selectedImageUrl} handleImageChange={handleImageChange} sendRequest={sendRequest} />
                        
                        <ProfileEditNames user={user} formUserData={formUserData} handleInputChange={handleInputChange} handleEdit={handleEdit} noEditFirstName={noEditFirstName} noEditLastName={noEditLastName} sendRequest={sendRequest}/>

                        <ProfileEditEmail user={user} formUserData={formUserData} handleInputChange={handleInputChange} sendRequest={sendRequest} handleEdit={handleEdit} noEditEmail={noEditEmail} />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <p>{msg ? msg : ''}</p>
        </>
    );
}

ProfileSettings.propTypes = {
    token: PropTypes.string.isRequired
};
