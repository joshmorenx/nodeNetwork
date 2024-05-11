import PropTypes from 'prop-types';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Link, Button } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material/'

export default function ProfileSettings({ token }) {
    const [noEditFirstName, setNoEditFirstName] = useState(true);
    const [noEditLastName, setNoEditLastName] = useState(true);
    const [noEditUsername, setNoEditUsername] = useState(true);
    const [noEditEmail, setNoEditEmail] = useState(true);
    const [selectedImage, setSelectedImage] = useState('https://flowbite.com/docs/images/people/profile-picture-5.jpg'); // Default image URL
    const { user } = useGetCurrentUser({ token });

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
        else if (editNum === 3) {
            if (result) {
                setNoEditUsername(false);
            }
        }
        else if (editNum === 4) {
            if (result) {
                setNoEditEmail(false);
            }
        }
        
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                const maxSize = 150;
                let width = img.width;
                let height = img.height;
    
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }
    
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
    
                // Convert canvas to data URL
                const resizedImage = canvas.toDataURL('image/jpeg');
    
                setSelectedImage(resizedImage);
            };
    
            img.src = event.target.result;
        };
    
        // Read the image file as a data URL
        reader.readAsDataURL(file);
    };
    

    const openFilePicker = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png';
        fileInput.multiple = false;
        fileInput.addEventListener('change', handleFileSelect);
        fileInput.click();
    }

    return (
        <>
        <Accordion expanded={true} color='primary'>
            <AccordionSummary
            // expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ mt: 1, bgcolor: '#f9f0ce', cursor: 'default!important' }}
            >
            <Typography>Modificar detalles de perfil</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}> 
                <Box className="avatar-container" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <p>Foto de perfil</p>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <img onClick={() => openFilePicker()} width={'150vw'} height={'150vw'} className="avatar m-auto cursor-pointer" src={selectedImage} alt="Rounded avatar" />
                            <Link href="#" onClick={() => openFilePicker()}><EditIcon /></Link>
                        </Box>
                    </Box>

                    <Box>
                        <Box>
                            <p>Nombre de pila</p>
                            <TextField
                                disabled={noEditFirstName}
                                autoFocus={true}
                                size='small'
                                type="text"
                                id="username"
                                name="username"
                                value={user.firstName ? user.firstName : ''}
                                required
                            />
                            <Link href="#" onClick={() => handleEdit('Nombre de pila', 1)}><EditIcon /></Link>
                        </Box>

                        <Box>
                            <p>Apellido</p>
                            <TextField
                                disabled={noEditLastName}
                                autoFocus={true}
                                size='small'
                                type="email"
                                id="email"
                                name="email"
                                value={user.lastName ? user.lastName : ''}
                                required
                            />
                            <Link href="#" onClick={() => handleEdit('Apellido', 2)}><EditIcon /></Link>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <p>Nombre de usuario</p>
                            <TextField
                                disabled={noEditUsername}
                                autoFocus={true}
                                size='small'
                                type="text"
                                id="username"
                                name="username"
                                value={user.username ? user.username : ''}
                                required
                            />
                            <Link href="#" onClick={() => handleEdit('Nombre de usuario', 3)}><EditIcon /></Link>
                        </Box>

                        <Box>
                            <p>Email</p>
                            <TextField
                                disabled={noEditEmail}
                                autoFocus={true}
                                size='small'
                                type="email"
                                id="email"
                                name="email"
                                value={user.email ? user.email : ''}
                                required
                            />
                            <Link href="#" onClick={() => handleEdit('Email', 4)}><EditIcon /></Link>
                        </Box>
                    </Box>
                </Box>
                <Button size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
        </>
    );
}

ProfileSettings.propTypes = {
    token: PropTypes.string
};
