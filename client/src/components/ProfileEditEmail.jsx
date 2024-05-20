import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link, Button, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileEditEmail({ formData, handleInputChange, sendRequest, user, noEditEmail, handleEdit }) {
    return (
        <Accordion expanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
                sx={{ mt: 1, bgcolor: '#f9f0ce' }}
            >
                <Typography>Modificar Email</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#faf1de' }}>

                <Box>
                    <p style={{ marginLeft: '45px' }}>Email</p>
                    <TextField
                        sx={{ ml: 5, width: '90%' }}
                        disabled={noEditEmail}
                        autoFocus={true}
                        label={user.email}
                        size='small'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Link href="#" onClick={() => handleEdit('Email', 4)}><EditIcon /></Link>
                </Box>
                <Button /*onClick={sendRequest}*/ size='large' variant="contained" color="primary" sx={{ mt: 2 }}>
                    Guardar
                </Button>
            </AccordionDetails>
        </Accordion>
    )
}