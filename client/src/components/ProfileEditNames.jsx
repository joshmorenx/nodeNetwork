import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';


export default function ProfileEditNames({ user, formUserData, handleInputChange, handleEdit, noEditFirstName, noEditLastName, sendRequest }) {
    const className = useSelector((state) => state.className);
    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                className={className}
                expandIcon={<ExpandMore className={className} />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
                sx={{ mt: 1, bgcolor: '#f9f0ce' }}
            >
                <Typography>Modificar nombre y apellidos</Typography>
            </AccordionSummary>
            <AccordionDetails className={className} sx={{ bgcolor: '#faf1de' }}>
                <Box>
                    <Box>
                        <Typography>Nombres actuales: {user.firstName}</Typography>
                        <TextField
                            className="bgx-white"
                            sx={{ width: '100%' }}
                            disabled={noEditFirstName}
                            autoFocus={true}
                            label="Nombres"
                            size='small'
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formUserData.firstName}
                            onChange={handleInputChange}
                            InputProps={{ endAdornment: <EditIcon onClick={() => handleEdit('Nombre de pila', 1)} /> }}
                        />
                    </Box>

                    <Box>
                        <Typography>Apellido actual: {user.lastName}</Typography>
                        <TextField
                            className="bgx-white"
                            sx={{ width: '100%' }}
                            disabled={noEditLastName}
                            autoFocus={true}
                            label="Apellidos"
                            size='small'
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formUserData.lastName}
                            onChange={handleInputChange}
                            InputProps={{ endAdornment: <EditIcon onClick={() => handleEdit('Apellido', 2)} /> }}
                        />
                    </Box>
                </Box>
                <Button onClick={()=>{sendRequest("name")}} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}