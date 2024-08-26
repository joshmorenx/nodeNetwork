import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';

export default function ProfileEditEmail({ formUserData, handleInputChange, sendRequest, user, noEditEmail, handleEdit }) {
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
                <Typography>Modificar Email</Typography>
            </AccordionSummary>
            <AccordionDetails className={className} sx={{ bgcolor: '#faf1de' }}>

                <Box>
                    <Typography>Correo Actual: {user.email}</Typography>
                    <TextField
                        className="bgx-white"
                        sx={{ width: '100%' }}
                        disabled={noEditEmail}
                        autoFocus={true}
                        label="email"
                        size='small'
                        type="email"
                        id="email"
                        name="email"
                        value={formUserData.email}
                        onChange={handleInputChange}
                        required
                        InputProps={{ endAdornment: <EditIcon onClick={() => handleEdit('Email', 4)} /> }}
                    />
                </Box>
                <Button onClick={()=>{sendRequest("email")}} size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}